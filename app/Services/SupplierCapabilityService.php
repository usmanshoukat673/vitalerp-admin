<?php

namespace App\Services;

use App\Models\SupplierCapability;
use Illuminate\Support\Facades\DB;

class SupplierCapabilityService
{
    public function getSupplierCapabilities(int $supplierId, int $compId)
    {
        SupplierCapability::firstOrCreate(['supplier_id' => $supplierId, 'comp_id' => $compId]);

        return SupplierCapability::with([
            'primaryNaicsCode',
            'secondaryNaicsCodes',
            'agencies',
            'primeContracts',
            'states',
            'countries',
        ])->where(['supplier_id' => $supplierId, 'comp_id' => $compId])->first();
    }

    public function isCompleted($supplierCapability)
    {
        return $supplierCapability->primary_naics_code != '' 
        && $supplierCapability->agencies->count() > 0 
        && $supplierCapability->states->count() > 0
        && $supplierCapability->countries->count() > 0
        && $supplierCapability->primeContracts->count() > 0;
    }

    public function saveSupplierCapabilities(int $supplierId, int $compId, array $data)
    {
        $supplierCapability = SupplierCapability::find($data['id']);
        $supplierCapability->primary_naics_code = $data['primary_naics_code'];
        $supplierCapability->has_prime_contracts = $data['has_prime_contracts'];
        $supplierCapability->primed_contract_last_two_years = $data['primed_contract_last_two_years'];
        $supplierCapability->acquisition_contracts = $data['acquisition_contracts'];
        $supplierCapability->product_and_services = $data['product_and_services'];
        $supplierCapability->updated_by = $data['updated_by'];
        $supplierCapability->save();

        $supplierCapability->secondaryNaicsCodes()->sync($data['secondary_codes'] ?? []);
        $supplierCapability->agencies()->sync($data['agencies'] ?? []);
        $supplierCapability->primeContracts()->sync($data['prime_contract_history'] ?? []);
        $supplierCapability->states()->sync($data['states'] ?? []);
        $supplierCapability->countries()->sync($data['countries'] ?? []);

        return $supplierCapability;
    }
}