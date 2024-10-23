<?php

namespace App\Services;

use App\Models\SupplierSocioenomic;
use Illuminate\Support\Facades\DB;

class SupplierSocioenomicService
{
    public function getSupplierSocioenomics(int $supplierId, int $compId)
    {
        SupplierSocioenomic::firstOrCreate(['supplier_id' => $supplierId, 'comp_id' => $compId]);   

        return SupplierSocioenomic::with(['socioenomicStatus'])->where(['supplier_id' => $supplierId, 'comp_id' => $compId])->first();
    }

    public function isCompleted($supplierSocioenomic)
    {
        return $supplierSocioenomic->socioenomicStatus->count() > 0
        && $supplierSocioenomic->mentor_protege_program != '';
    }

    public function saveSupplierSocioenomics(int $supplierId, int $compId, array $data)
    {
        $supplierSocioenomic = SupplierSocioenomic::find($data['id']);
        $supplierSocioenomic->ethnicity_id = $data['ethnicity'];
        $supplierSocioenomic->exit_date = $data['exit_date'];
        $supplierSocioenomic->mentor_protege_program = $data['mentor_protege_program'];
        $supplierSocioenomic->relationships = $data['relationships'];
        $supplierSocioenomic->updated_by = $data['updated_by'];
        $supplierSocioenomic->save();   

        $supplierSocioenomic->socioenomicStatus()->sync($data['socioecomic_status'] ?? []);

        return $supplierSocioenomic;
    }
}   