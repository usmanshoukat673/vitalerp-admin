<?php

namespace App\Services;

use App\Models\SupplierLocation;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class SupplierLocationService
{

    public function add($data)
    {
        $location = SupplierLocation::create($data);

        return $location;
    }

    public function listLocations($supplierId)
    {
        return SupplierLocation::where('supplier_id', $supplierId)->get();
    }

    public function addLocation(array $data)
    {
        // $this->validateLocationData($data);
        return SupplierLocation::create($data);
    }

    public function updateLocation(SupplierLocation $location, array $data)
    {
        //  $this->validateLocationData($data, $location->id);

        $location->update($data);

        return $location;
    }

    public function deleteLocation(SupplierLocation $location)
    {
        return $location->delete();
    }

    public function getDefaultLocation($supplierId)
    {
        return SupplierLocation::where('supplier_id', $supplierId)->where('default', 1)->first();
    }

    protected function validateLocationData(array $data, $locationId = null)
    {
        Validator::make($data, [
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|string|max:255',
            'timezone' => 'required|string|max:100',
            'supplier_id' => 'required|exists:suppliers,id',
            'name' => 'required|max:255|unique:supplier_locations,name,' . $locationId . ',id,supplier_id,' . ($data['supplier_id'] ?? null),
        ])->validate();
    }
}
