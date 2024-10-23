<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LocationServiced extends Model
{
    use HasFactory;

    protected $fillable = [
        'slcd_id',
        'state_id',
    ];

    public function supplierLaborCategoryDetail()
    {
        return $this->belongsTo(SupplierLaborCategoryDetail::class, 'slcd_id');
    }

    public function state()
    {
        return $this->belongsTo(CountryState::class, 'state_id');
    }
}
