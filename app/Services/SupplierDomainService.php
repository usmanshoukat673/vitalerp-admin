<?php

namespace App\Services;

use App\Models\Supplier;
use Illuminate\Support\Facades\DB;

class SupplierDomainService
{
    /**
     * Retrieve suppliers with their associated domains.
     *
     * @param string|null $search
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getSuppliersWithDomains($search = null, $perPage = 10)
    {
        $query = Supplier::query();

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        $query->with('domains');

        return $query->paginate($perPage);
    }

    /**
     * Assign the given domains to the given suppliers. If the supplier-domain
     * relationship does not already exist, it will be created.
     *
     * @param array $supplierIds
     * @param array $domainIds
     * @return void
     */
    public function addDomainsToSuppliers(array $supplierIds, array $domainIds)
    {
        foreach ($supplierIds as $supplierId) {
            foreach ($domainIds as $domainId) {
                DB::table('supplier_domains')->updateOrInsert([
                    'supplier_id' => $supplierId,
                    'domain_id' => $domainId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }

    /**
     * Assign the given domains to the given suppliers. Any existing supplier assignments
     * that are not in the given list of suppliers will be removed.
     *
     * @param array $supplierIds
     * @param array $domainIds
     * @return bool
     */
    public function assignDomainsToSuppliers(array $supplierIds, array $domainIds)
    {
        foreach ($domainIds as $domainId) {
            // Get the current suppliers assigned to this domain
            $alreadyAssignedSupplierIds = DB::table('supplier_domains')
                ->where('domain_id', $domainId)
                ->pluck('supplier_id')
                ->toArray();

            $suppliersToRemove = array_diff($alreadyAssignedSupplierIds, $supplierIds);

            // Remove old supplier assignments that are no longer in the new list
            if (!empty($suppliersToRemove)) {
                DB::table('supplier_domains')
                    ->where('domain_id', $domainId)
                    ->whereIn('supplier_id', $suppliersToRemove)
                    ->delete();
            }

            $suppliersToAdd = array_diff($supplierIds, $alreadyAssignedSupplierIds);

            // Add new supplier assignments
            foreach ($suppliersToAdd as $supplierId) {
                DB::table('supplier_domains')->insert([
                    'supplier_id' => $supplierId,
                    'domain_id' => $domainId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return true;
    }
}
