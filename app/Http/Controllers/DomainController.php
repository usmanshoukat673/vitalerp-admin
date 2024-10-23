<?php

namespace App\Http\Controllers;

use App\Services\DomainService;
use App\Services\SupplierDomainService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DomainController extends Controller
{
    protected $domainService, $supplierDomainService;

    /**
     * Constructor
     * @param DomainService $domainService
     * @param SupplierDomainService $supplierDomainService
     */
    public function __construct(DomainService $domainService, SupplierDomainService $supplierDomainService)
    {
        $this->domainService = $domainService;
        $this->supplierDomainService = $supplierDomainService;
    }

    /**
     * Fetch domains with pagination and search functionality
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $domains = $this->domainService->getDomains($request);
        return response()->json($domains);
    }

    /**
     * Fetch all domains
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function all(Request $request)
    {
        return $this->domainService->getAllDomains($request);
    }

    /**
     * Create a new domain with associated labor categories and suppliers
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function add(Request $request)
    {
        $validatedData = $request->validate([
            'comp_id' => 'required|exists:companies,id',
            'name' => 'required|max:255|unique:domains,name,NULL,id,comp_id,' . $request->comp_id,
            'description' => 'nullable|string',
            'labor_category_ids' => [
                'array',
                function ($attribute, $value, $fail) use ($request) {
                    if (!empty($value) && empty($request->supplier_ids)) {
                        $fail('Suppliers are required if labor categories are selected.');
                    }
                }
            ],
            'labor_category_ids.*' => 'exists:labor_categories,id',
            'supplier_ids' => [
                'array',
                function ($attribute, $value, $fail) use ($request) {
                    if (!empty($value) && empty($request->labor_category_ids)) {
                        $fail('Labor categories are required if suppliers are selected.');
                    }
                }
            ],
            'supplier_ids.*' => 'exists:suppliers,id',
        ], [
            'labor_category_ids.*.exists' => 'The selected labor category is invalid.',
            'supplier_ids.*.exists' => 'The selected supplier is invalid.',
        ]);

        DB::beginTransaction();
        try {

            $supplierIds = $request->input('supplier_ids');

            $domain = $this->domainService->createDomain($validatedData, $supplierIds);

            $domainIds = [$domain->id];

            $this->supplierDomainService->addDomainsToSuppliers($supplierIds, $domainIds);

            DB::commit();
            return response()->json($domain, 201);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error("an error occurred while creating domain: " . $e->getMessage());
            return response()->json(['message' => 'Failed to create domain'], 500);
        }
    }

    /**
     * Update an existing domain with associated labor categories and suppliers
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'comp_id' => 'required|exists:companies,id',
            'name' => 'required|max:255|unique:domains,name,' . $id . ',id,comp_id,' . $request->comp_id,
            'description' => 'nullable|string',
            'labor_category_ids' => [
                'array',
                function ($attribute, $value, $fail) use ($request) {
                    if (!empty($value) && empty($request->supplier_ids)) {
                        $fail('Suppliers are required if labor categories are selected.');
                    }
                }
            ],
            'labor_category_ids.*' => 'exists:labor_categories,id',
            'supplier_ids' => [
                'array',
                function ($attribute, $value, $fail) use ($request) {
                    if (!empty($value) && empty($request->labor_category_ids)) {
                        $fail('Labor categories are required if suppliers are selected.');
                    }
                }
            ],
            'supplier_ids.*' => 'exists:suppliers,id',
        ], [
            'labor_category_ids.*.exists' => 'The selected labor category is invalid.',
            'supplier_ids.*.exists' => 'The selected supplier is invalid.',
        ]);

        DB::beginTransaction();
        try {

            $supplierIds = $request->input('supplier_ids');

            $domain = $this->domainService->updateDomain($id, $validatedData, $supplierIds);

            $domainIds = [$domain->id];

            $this->supplierDomainService->assignDomainsToSuppliers($supplierIds, $domainIds);

            $newLaborCategoryIds = $request->input('labor_category_ids');

            if (count($supplierIds) > 0 && count($newLaborCategoryIds) > 0) {
                foreach ($supplierIds as $supplierId) {
                    foreach ($newLaborCategoryIds as $laborCategoryId) {
                        $existingRecord = DB::table('supplier_labor_category_details')
                            ->where('domain_id', $domain->id)
                            ->where('supplier_id', $supplierId)
                            ->where('labor_category_id', $laborCategoryId)
                            ->first();

                        if (!$existingRecord) {
                            DB::table('supplier_labor_category_details')->insert([
                                'domain_id' => $domain->id,
                                'supplier_id' => $supplierId,
                                'labor_category_id' => $laborCategoryId,
                                'created_at' => now(),
                                'updated_at' => now(),
                            ]);
                        }
                    }
                }
            }

            DB::commit();
            return response()->json($domain);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error("an error occurred while updating domain: " . $e->getMessage());
            return response()->json(['message' => 'Failed to update domain'], 500);
        }
    }

    /**
     * Remove the specified domain from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $this->domainService->deleteDomain($id);
            DB::commit();
            return response()->json(['message' => 'Domain deleted successfully']);
        } catch (\Exception $e) {
            DB::rollback();
            Log::error("an error occurred while deleting domain: " . $e->getMessage());
            return response()->json(['message' => 'Failed to delete domain'], 500);
        }
    }
}
