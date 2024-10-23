<?php

namespace App\Http\Controllers;

use App\Http\Traits\DocumentsHelper;
use App\Models\SupplierDocument;
use App\Services\CorporateInformationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CorporateInformationController extends Controller
{
    use DocumentsHelper;

    protected $corporateInformationService;

    public function __construct(CorporateInformationService $corporateInformationService)
    {
        $this->corporateInformationService = $corporateInformationService;
    }

    /**
     * Get corporate information of a supplier
     * 
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getCorporateInformation(Request $request, $supplierId)
    {
        DB::beginTransaction();
        try {
            $corporateInformation = $this->corporateInformationService->getCorporateInformation($supplierId, $request->comp_id);
            DB::commit();

            return response()->json([
                'corporate_information' => $corporateInformation,
                'isCompleted' => $this->corporateInformationService->isCompleted($corporateInformation),
                'message' => 'Successfully retrieved corporate information'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("an error occurred while getting corporate information: " . $e->getMessage() . ' in file ' . $e->getFile() . ' on line ' . $e->getLine());
            return response()->json(['message' => 'Failed to get corporate information'], 500);
        }
    }

    /**
     * Save corporate information of a supplier
     * 
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveCorporateInformation(Request $request, $supplierId)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:corporate_information,id',
            'name' => 'required|max:255',
            'another_name' => 'nullable|string|max:255',
            'parent_organization' => 'nullable',
            'parent_organization_name' => 'nullable|max:255',
            'established_year' => 'required|date_format:Y',
            'entity_type' => 'required|max:255',
            'registration_state' => 'required|max:255',
            'usa_owned_entity' => 'required',
            'foreign_ownership' => 'required',
            'uei_code' => 'required|max:255',
            'cage_code' => 'nullable|max:255',
            'duns_number' => 'nullable|max:255',
            'business_web_page' => 'required|max:255|url',
            'full_time_employees' => 'required|numeric',
            'average_annual_revenue' => 'required|string|max:255',
            'dcaa_approved' => 'required',
            'special_awards' => 'nullable|string',
            'other_comments' => 'nullable|string',
            'file' => 'nullable|mimes:pdf|max:20480', // max size in kilobytes (20mb)
        ]);

        DB::beginTransaction();
        try {
            $validatedData['updated_by'] = $request->user()->id;
            $corporateInformation = $this->corporateInformationService->saveCorporateInformation($supplierId, $request->comp_id, $validatedData, $request->file('file'));
            DB::commit();

            return response()->json([
            'message' => 'Corporate information saved successfully', 
            'supplier_document' => $corporateInformation->supplierDocument()->first()
         ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("an error occurred while saving corporate information: " . $e->getMessage() . ' in file ' . $e->getFile() . ' on line ' . $e->getLine());
            return response()->json(['message' => 'Failed to save corporate information'], 500);
        }
    }

    public function downloadBrochure(Request $request, $supplierId, $documentId)
    {
        if (!$documentId) {
            abort(404);
        }

        $document = SupplierDocument::where(['id' => $documentId, 'supplier_id' => $supplierId])->first();
        $mime = $this->getMimeType($document->ext);
        $path = config('vitalerp.supplier_document_directory') . '/' . $document->id . '.' . $document->ext;
        $name = $this->cleanName($document->name);
        return response()->download($path, $name, ['Content-Type' => $mime]);
    }

    //TODO: Needs to make this function global 
    public function getMimeType($ext)
    {
        $mime_types = [
            'pdf' => 'application/pdf',
            'txt' => 'text/plain',
            'html' => 'text/html',
            'htm' => 'text/html',
            'exe' => 'application/octet-stream',
            'zip' => 'application/zip',
            'doc' => 'application/msword',
            'xls' => 'application/vnd.ms-excel',
            'ppt' => 'application/vnd.ms-powerpoint',
            'gif' => 'image/gif',
            'png' => 'image/png',
            'jpeg' => 'image/jpg',
            'jpg' => 'image/jpg',
            'php' => 'text/plain',
            'csv' => 'text/csv',
            'xlsx' => 'application/octet-stream',
            'pptx' => 'application/octet-stream',
            'docx' => 'application/octet-stream'
            // 'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (isset($mime_types[$ext])) {
            return $mime_types[$ext];
        } else {
            return 'application/octet-stream';
        }
    }
}
