<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapabilitySecondaryCodes extends Model
{
    use HasFactory;


    protected $fillable = [
        'supplier_capability_id',
        'naics_code_id',
    ];


    public function supplierCapability()
    {
        return $this->belongsTo(SupplierCapability::class, 'supplier_capability_id');
    }

    public function naicsCode()
    {
        return $this->belongsTo(NaicsCode::class, 'naics_code_id');
    }
}
