<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapabilityStates extends Model
{
    use HasFactory;

    protected $fillable = [
        'supplier_capability_id',
        'state_id',
    ];


    public function supplierCapability()
    {
        return $this->belongsTo(SupplierCapability::class, 'supplier_capability_id');
    }

    public function state() 
    {       
        return $this->belongsTo(CountryState::class, 'state_id');
    }
}
