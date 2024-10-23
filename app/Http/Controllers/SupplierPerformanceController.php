<?php

namespace App\Http\Controllers;

use App\Services\PastPerformanceService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SupplierPerformanceController extends Controller
{

    protected $pastPerformanceService;

    /**
     * Create a new controller instance.
     *
     * @param PastPerformanceService $pastPerformanceService
     *
     * @return void
     */
    public function __construct(PastPerformanceService $pastPerformanceService)
    {
        $this->pastPerformanceService = $pastPerformanceService;
    }

    /**
     * Get the domains, labor categories, and details for the given supplier and company.
     *
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Support\Collection
     */
    public function getPerformance(Request $request, $supplierId)
    {
        $comp_id = $request->input('comp_id');

        $pastPerformance = $this->pastPerformanceService->getDomainsWithLaborCategoriesAndDetails($supplierId, $comp_id);

        return response()->json([
            'past_performance' => $pastPerformance,
            'isCompleted' => $this->pastPerformanceService->isCompleted($pastPerformance),
            'message' => 'Successfully retrieved supplier performance',
        ]);
    }

    public function savePerformance(Request $request, $supplierId)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:supplier_labor_category_details,id',
            'past_performance' => 'nullable|boolean',
            'last_date_performed_services' => 'nullable|date',
            'max_num_on_one_contract' => 'nullable|numeric|max:100',
            'locations_serviced' => 'nullable|array',
            'locations_serviced.*' => 'exists:country_states,id',
            'customer_type' => 'nullable|array',
            'service_rating' => 'nullable|integer',
        ], [
            'locations_serviced.array' => 'Please select at least one location',
            'locations_serviced.*.exists' => 'Please select a valid location',
            'service_rating.integer' => 'Please select a valid service rating',
            'max_num_on_one_contract.max' => 'Max number on one contract cannot be more than 100',
        ]);

        DB::beginTransaction();

        try {
            $this->pastPerformanceService->savePerformance($supplierId, $validatedData);

            $comp_id = $request->input('comp_id');

            $pastPerformance = $this->pastPerformanceService->getDomainsWithLaborCategoriesAndDetails($supplierId, $comp_id);

            DB::commit();
            return response()->json(['message' => 'Performance saved successfully', 'isCompleted' => $this->pastPerformanceService->isCompleted($pastPerformance)]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("an error occurred while saving performance: " . $e->getMessage());
            return response()->json(['message' => 'Failed to save performance'], 500);
        }
    }
}
