<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SupplierLaborCategoryDetail extends Model
{
    use HasFactory;

    protected $table = 'supplier_labor_category_details';

    protected $fillable = [
        'supplier_id',
        'domain_id',
        'labor_category_id',
        'past_performance',
        'last_date_performed_services',
        'maximum_number_on_one_contract',
        'customer_type',
        'overall_service_rating'
    ];

    protected $casts = [
        'customer_type' => 'array',
        'past_performance' => 'boolean'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function domain()
    {
        return $this->belongsTo(CompanyDomain::class, 'domain_id');
    }

    public function laborCategory()
    {
        return $this->belongsTo(LaborCategory::class, 'labor_category_id');
    }

    public function locationsServiced()
    {
        return $this->hasMany(LocationServiced::class, 'slcd_id', 'id');
    }
}
