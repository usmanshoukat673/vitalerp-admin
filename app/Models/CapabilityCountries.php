<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapabilityCountries extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_capability_id',
        'country_code_id',
    ];

    public function supplierCapability()
    {
        return $this->belongsTo(SupplierCapability::class, 'supplier_capability_id');
    }   

    public function countryCode()
    {
        return $this->belongsTo(CountryCode::class, 'country_code_id');
    }
}
