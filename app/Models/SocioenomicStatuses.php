<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocioenomicStatuses extends Model
{
    use HasFactory;

    protected $table = 'supplier_socioenomics';

    protected $fillable = [
        'supplier_socioenomic_id',
        'socioenomic_id',
    ];

    public function supplierSocioeconomic()
    {
        return $this->belongsTo(SupplierSocioenomic::class, 'supplier_socioenomic_id');
    }

    public function socioeconomic()
    {
        return $this->belongsTo(Socioeconomic::class, 'socioenomic_id');
    }
}
