<?php

namespace App\Services;

use App\Models\CorporateInformation;
use App\Models\Supplier;
use Illuminate\Support\Facades\DB;

class CorporateInformationService
{
    public function getCorporateInformation(int $supplierId, int $compId)
    {
        CorporateInformation::firstOrCreate(['supplier_id' => $supplierId, 'comp_id' => $compId]);

        return CorporateInformation::with('supplierDocument')->where(['supplier_id' => $supplierId, 'comp_id' => $compId])->first();
    }

    public function isCompleted($corporateInformation)
    {
        return $corporateInformation->established_year != '' 
        && $corporateInformation->entity_type != ''
        && $corporateInformation->registration_state != ''
        && $corporateInformation->usa_owned_entity != ''
        && $corporateInformation->foreign_ownership != ''
        && $corporateInformation->uei_code != ''
        && $corporateInformation->business_web_page != ''
        && $corporateInformation->full_time_employees != ''
        && $corporateInformation->average_annual_revenue != ''
        && $corporateInformation->dcaa_approved != '' ? true : false;
    }

    public function saveCorporateInformation(int $supplierId, int $compId, array $data, $file = null)
    {

        $corporateInformation = CorporateInformation::find($data['id']);
        $corporateInformation->name = $data['name'];
        $corporateInformation->another_name = $data['another_name'];
        $corporateInformation->parent_organization = (bool) $data['parent_organization'];
        $corporateInformation->parent_organization_name = $data['parent_organization_name'];
        $corporateInformation->established_year = $data['established_year'];
        $corporateInformation->entity_type = $data['entity_type'];
        $corporateInformation->registration_state = $data['registration_state'];
        $corporateInformation->usa_owned_entity = (bool)$data['usa_owned_entity'];
        $corporateInformation->foreign_ownership = (bool)$data['foreign_ownership'];
        $corporateInformation->uei_code = $data['uei_code'];
        $corporateInformation->cage_code = $data['cage_code'];
        $corporateInformation->duns_number = $data['duns_number'];
        $corporateInformation->business_web_page = $data['business_web_page'];
        $corporateInformation->full_time_employees = $data['full_time_employees'];
        $corporateInformation->average_annual_revenue = $data['average_annual_revenue'];
        $corporateInformation->dcaa_approved = (bool)$data['dcaa_approved'];
        $corporateInformation->special_awards = $data['special_awards'];
        $corporateInformation->other_comments = $data['other_comments'];
        $corporateInformation->updated_by = $data['updated_by'];

        if ($file != null) {

            // find existing supplier doc 
            $corporateInformation->supplierDocument()->where('supplier_id', $supplierId)->delete();

            $name = $file->getClientOriginalName();
            $supplierDocument = $corporateInformation->supplierDocument()->create([
                'supplier_id' => $supplierId,
                'name' => $name,
                'size'       => $file->getSize(),
                'ext'        => strtolower($file->getClientOriginalExtension()),
                'type' => 'file',
                'created_by' => $data['updated_by'],
                'updated_by' => $data['updated_by'],
            ]);

            $corporateInformation->sup_doc_id = $supplierDocument->id;

            $file->move(config('vitalerp.supplier_document_directory'), $supplierDocument->id . '.' . $supplierDocument->ext);
        }

        $corporateInformation->save();

        return $corporateInformation;
    }
}
