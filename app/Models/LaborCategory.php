<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LaborCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'naics_code',
        'pcs_code',
        'description',
        'comp_id',
        'created_by',
        'updated_by'
    ];

    public function naicsCode()
    {
        return $this->belongsTo(NaicsCode::class, 'naics_code');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function createdUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function domains()
    {
        return $this->belongsToMany(Domain::class, 'domain_labor_category', 'labor_category_id', 'domain_id');
    }

    public function supplierLaborCategoryDetails()
    {
        return $this->hasMany(SupplierLaborCategoryDetail::class, 'labor_category_id');
    }
}
