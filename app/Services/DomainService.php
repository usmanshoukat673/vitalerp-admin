<?php

namespace App\Services;

use App\Models\CompanyDomain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DomainService
{
    public function getDomain($slug)
    {
        return CompanyDomain::where('slug', $slug)->first();
    }

    // Fetch domains with pagination and search functionality
    public function getDomains(Request $request)
    {
        $query = CompanyDomain::with('laborCategories')
            ->where('comp_id', $request->comp_id);
        // Apply search filter
        if ($request->has('search') && $request->search) {
            $query->where('name', 'LIKE', '%' . $request->search . '%');
        }

        $query->with('suppliers');

        // Sort results
        if ($request->has('sort_by') && $request->sort_by) {
            $query->orderBy($request->sort_by, $request->sort_order);
        }

        // Paginate results
        return $query->paginate(10);
    }

    // Fetch all domains
    public function getAllDomains(Request $request)
    {
        return CompanyDomain::select('id', 'name')
            ->where('comp_id', $request->comp_id)
            ->get();
    }

    /**
     * Create a new domain with associated labor categories and suppliers
     *
     * @param array $data
     * @param array $supplierIds
     * @return \App\Models\CompanyDomain
     */
    public function createDomain(array $data, array $supplierIds)
    {
        $domain = CompanyDomain::create([
            'comp_id' => $data['comp_id'],
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        $laborCategoryIds = $data['labor_category_ids'];

        // Assign labor categories if provided
        if (isset($data['labor_category_ids'])) {
            $domain->laborCategories()->sync($laborCategoryIds);
        }

        if (count($supplierIds) > 0 && count($laborCategoryIds) > 0) {
            foreach ($supplierIds as $supplierId) {
                foreach ($laborCategoryIds as $laborCategoryId) {
                    DB::table('supplier_labor_category_details')->insert([
                        'domain_id' => $domain->id,
                        'supplier_id' => $supplierId,
                        'labor_category_id' => $laborCategoryId,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }
            }
        } // updateOrInsert

        return $domain->load('laborCategories');
    }

    /**
     * Update an existing domain with associated labor categories and suppliers
     *
     * @param int $id
     * @param array $data
     * @param array $supplierIds
     * @return \App\Models\CompanyDomain
     */
    public function updateDomain($id, array $data, array $supplierIds)
    {
        $domain = CompanyDomain::findOrFail($id);

        $existingLaborCategoryIds = $domain->laborCategories->pluck('id')->toArray();

        $domain->update([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        // Sync labor categories if provided
        if (isset($data['labor_category_ids'])) {

            $newLaborCategoryIds = $data['labor_category_ids'];

            $domain->laborCategories()->sync($data['labor_category_ids']);

            $removedLaborCategoryIds = array_diff($existingLaborCategoryIds, $newLaborCategoryIds);

            if (count($removedLaborCategoryIds) > 0) {
                DB::table('supplier_labor_category_details')
                    ->where('domain_id', $domain->id)
                    ->whereIn('labor_category_id', $removedLaborCategoryIds)
                    ->whereIn('supplier_id', $supplierIds)
                    ->delete();
            }
        }

        return $domain->load('laborCategories');
    }

    // Delete a domain
    public function deleteDomain($id)
    {
        $domain = CompanyDomain::findOrFail($id);
        $domain->delete();
    }
}
