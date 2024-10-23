<?php

namespace App\Services;

use App\Models\Company;

class SupplierService
{
    /**
     * Fetch all suppliers for the given company.
     *
     * @param int $companyId
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all($companyId)
    {
        $company = Company::with('suppliers')->findOrFail($companyId);
        return $company->suppliers;
    }

    /**
     * Search for suppliers within a given company using multiple fields.
     *
     * @param int $companyId
     * @param string|null $search
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function search($companyId, $search = null)
    {
        $company = Company::with(['suppliers' => function ($query) use ($search) {
            if ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%")
                        ->orWhere('city', 'like', "%{$search}%")
                        ->orWhere('state', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            }
        }])->findOrFail($companyId);

        return $company->suppliers;
    }
}
