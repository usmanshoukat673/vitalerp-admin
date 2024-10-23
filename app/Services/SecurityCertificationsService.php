<?php

namespace App\Services;

use App\Models\SecurityCertification;

class SecurityCertificationsService
{

    public function getSecurityCertifications(int $supplierId, int $compId)
    {
        SecurityCertification::firstOrCreate(['supplier_id' => $supplierId, 'comp_id' => $compId]);
        return SecurityCertification::with([
            'registredCertifications',
            'compliantStandards',
            'compliantRequirements',
        ])->where(['supplier_id' => $supplierId, 'comp_id' => $compId])->first();
    }

    public function isCompleted($securityCertification)
    {
        return $securityCertification->prepared_to_support != '';
    }

    public function saveSecurityCertifications(int $supplierId, int $compId, array $data)
    {
        $securityCertification = SecurityCertification::find($data['id']);
        $securityCertification->sustainability_program = $data['sustainability_program'];
        $securityCertification->describe = $data['sustainability_program_describe'];
        $securityCertification->security_level = $data['security_level'];
        $securityCertification->prepared_to_support = $data['prepared_to_support'];
        $securityCertification->updated_by = $data['updated_by'];
        $securityCertification->save();

        $securityCertification->registredCertifications()->sync($data['registred_certifications'] ?? []);
        $securityCertification->compliantStandards()->sync($data['compliant_standards'] ?? []);
        $securityCertification->compliantRequirements()->sync($data['compliant_requirements'] ?? []);

        return $securityCertification;
    }
}