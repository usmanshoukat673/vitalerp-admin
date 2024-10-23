<?php

namespace App\Http\Controllers;

use App\Services\CorporateInformationService;
use App\Services\PastPerformanceService;
use App\Services\SecurityCertificationsService;
use App\Services\SupplierCapabilityService;
use App\Services\SupplierSocioenomicService;
use Illuminate\Http\Request;

class CoportaProfileController extends Controller
{
    protected $corporateInformationService, $supplierCapabilityService , $supplierSocioenomicService, $securityCertificationsService, $pastPerformanceService;

    public function __construct(CorporateInformationService $corporateInformationService, SupplierCapabilityService $supplierCapabilityService, SupplierSocioenomicService $supplierSocioenomicService, SecurityCertificationsService $securityCertificationsService, PastPerformanceService $pastPerformanceService)
    {
        $this->corporateInformationService = $corporateInformationService;
        $this->supplierCapabilityService = $supplierCapabilityService;
        $this->supplierSocioenomicService = $supplierSocioenomicService;
        $this->securityCertificationsService = $securityCertificationsService;
        $this->pastPerformanceService = $pastPerformanceService;
    }

    public function getStatus(Request $request, $supplierId)
    {
        $corporateInformation = $this->corporateInformationService->getCorporateInformation($supplierId, $request->comp_id);
        $supplierCapability = $this->supplierCapabilityService->getSupplierCapabilities($supplierId, $request->comp_id);
        $supplierSocioenomic = $this->supplierSocioenomicService->getSupplierSocioenomics($supplierId, $request->comp_id);
        $securityCertifications = $this->securityCertificationsService->getSecurityCertifications($supplierId, $request->comp_id);
        $pastPerformance = $this->pastPerformanceService->getDomainsWithLaborCategoriesAndDetails($supplierId, $request->comp_id);

        return response()->json([
            'corporate_information' => $this->corporateInformationService->isCompleted($corporateInformation),
            'supplier_capability' => $this->supplierCapabilityService->isCompleted($supplierCapability),
            'supplier_socioenomic' => $this->supplierSocioenomicService->isCompleted($supplierSocioenomic),
            'security_certifications' => $this->securityCertificationsService->isCompleted($securityCertifications),
            'past_performance' => $this->pastPerformanceService->isCompleted($pastPerformance),
        ]);
    }
}
