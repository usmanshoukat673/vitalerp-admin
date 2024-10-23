<?php

namespace App\Http\Controllers;

use App\Services\SecurityCertificationsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SecurityCertificationsController extends Controller
{
    protected $securityCertificationsService;

    public function __construct(SecurityCertificationsService $securityCertificationsService)
    {
        $this->securityCertificationsService = $securityCertificationsService;
    }

    /**
     * Get the security certifications for the given supplier and company.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getSecurityCertifications(Request $request, $supplierId)
    {
        $securityCertifications = $this->securityCertificationsService->getSecurityCertifications($supplierId, $request->comp_id);
        return response()->json([
            'security_certifications' => $securityCertifications,
            'isCompleted' => $this->securityCertificationsService->isCompleted($securityCertifications),
            'message' => 'Successfully retrieved security certifications'   
        ]);
    }

    /**
     * Save security certifications
     *
     * @param \Illuminate\Http\Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveSecurityCertifications(Request $request, $supplierId)
    {
        $validatedData = $request->validate([
            'id' => 'required|exists:security_certifications,id',
            'sustainability_program' => 'nullable',
            'sustainability_program_describe' => 'nullable',
            'sustainability_program_describe' => $request->sustainability_program == 1 ? 'required' : 'nullable',
            'registred_certifications' => 'nullable|array',
            'registred_certifications.*' => 'exists:quality_certs,id',
            'compliant_standards' => 'nullable|array',
            'compliant_standards.*' => 'exists:quality_certs,id',
            'security_level' => 'nullable',
            'compliant_requirements' => 'nullable|array',
            'compliant_requirements.*' => 'exists:compliant_reqs,id',
            'prepared_to_support' => 'required',
        ], [
            'sustainability_program_describe.required' => 'Please describe the sustainability program.',
        ]);

        DB::beginTransaction();
        try {
            $validatedData['updated_by'] = $request->user()->id;

            $supplierSecurityCertification = $this->securityCertificationsService->saveSecurityCertifications($supplierId, $request->comp_id, $validatedData);

            DB::commit();

            return response()->json(['message' => 'Security certifications saved successfully', 'data' => $supplierSecurityCertification]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error("an error occurred while saving security certifications: " . $e->getMessage());
            return response()->json(['message' => 'Failed to save security certifications'], 500);
        }
    }
}
