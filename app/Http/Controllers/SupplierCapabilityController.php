<?php

namespace App\Http\Controllers;

use App\Services\SupplierCapabilityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SupplierCapabilityController extends Controller
{
    protected $supplierCapabilityService;

    public function __construct(SupplierCapabilityService $supplierCapabilityService)
    {
        $this->supplierCapabilityService = $supplierCapabilityService;
    }

    /**
     * Retrieves a supplier's capabilities.
     *
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCapabilities(Request $request, $supplierId)
    {
        $supplierCapability = $this->supplierCapabilityService->getSupplierCapabilities($supplierId, $request->comp_id);
        return response()->json([
            'supplier_capability' => $supplierCapability,
            'isCompleted' => $this->supplierCapabilityService->isCompleted($supplierCapability),
            'message' => 'Successfully retrieved supplier capabilities'
        ]);
    }

    /**
     * Saves a supplier's capabilities.
     *
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveCapabilities(Request $request, $supplierId)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:supplier_capabilities,id',
            'primary_naics_code' => 'required|exists:naics_codes,id',
            'agencies' => 'required|array',
            'agencies.*' => 'exists:agencies,id',
            'has_prime_contracts' => 'nullable',
            'primed_contract_last_two_years' => 'nullable',
            'prime_contract_history' => 'required|array',
            'prime_contract_history.*' => 'exists:prime_contracts,id',
            'acquisition_contracts' => 'nullable',
            'product_and_services' => 'nullable',
            'secondary_codes' => 'nullable|array',
            'secondary_codes.*' => 'exists:naics_codes,id',
            'states' => 'required|array',
            'states.*' => 'exists:country_states,id',
            'countries' => 'required|array',
            'countries.*' => 'exists:country_codes,id',
        ]);

        DB::beginTransaction();
        try {
            $validatedData['updated_by'] = $request->user()->id;

            $supplierCapability = $this->supplierCapabilityService->saveSupplierCapabilities($supplierId, $request->comp_id, $validatedData);

            DB::commit();

            return response()->json(['message' => 'Capabilities saved successfully', 'data' => $supplierCapability]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("an error occurred while saving capabilities: " . $e->getMessage());
            return response()->json(['message' => 'Failed to save capabilities'], 500);
        }
    }
}
