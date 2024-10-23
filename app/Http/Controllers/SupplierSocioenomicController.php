<?php

namespace App\Http\Controllers;

use App\Services\SupplierSocioenomicService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SupplierSocioenomicController extends Controller
{

    protected $supplierSocioenomicService;

    public function __construct(SupplierSocioenomicService $supplierSocioenomicService)
    {
        $this->supplierSocioenomicService = $supplierSocioenomicService;
    }

    /**
     * Get the socioenomics of a supplier.
     * 
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSocioenomics(Request $request, $supplierId)
    {
        $supplierSocioenomic = $this->supplierSocioenomicService->getSupplierSocioenomics($supplierId, $request->comp_id);
        return response()->json([
            'supplier_socioenomics' => $supplierSocioenomic,
            'isCompleted' => $this->supplierSocioenomicService->isCompleted($supplierSocioenomic),
            'message' => 'Successfully retrieved supplier socioenomics'
        ]);
    }

    /**
     * Saves the socioenomics of a supplier.
     * 
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveSocioenomics(Request $request, $supplierId)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:supplier_socioenomics,id',
            'socioecomic_status' => 'required|array',
            'socioecomic_status.*' => 'exists:socioeconomics,id',
            'exit_date' => ''.in_array(17, $request->socioecomic_status) ? 'required' : 'nullable'.'|date',
            'ethnicity' => 'nullable',
            'mentor_protege_program' => 'required',
            'relationships' => $request->mentor_protege_program == 1 ? 'required' : 'nullable',
        ], [
            'exit_date.required' => 'Please provide an exit date.',
            'relationships.required' => 'Please provide relationships.',
        ]);

        DB::beginTransaction();
        try {
            $validatedData['updated_by'] = $request->user()->id;

            $supplierSocioenomic = $this->supplierSocioenomicService->saveSupplierSocioenomics($supplierId, $request->comp_id, $validatedData);

            DB::commit();

            return response()->json(['message' => 'Socioenomics saved successfully', 'data' => []]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("an error occurred while saving socioenomics: " . $e->getMessage());
            return response()->json(['message' => 'Failed to save socioenomics'], 500);
        }
    }
}
