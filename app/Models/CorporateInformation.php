<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CorporateInformation extends Model
{
    use HasFactory;

    protected $fillable = [
        'comp_id',
        'supplier_id',
        'name',
        'another_name',
        'parent_organization',
        'parent_organization_name',
        'established_year',
        'entity_type',
        'registration_state',
        'usa_owned_entity',
        'foreign_ownership',
        'uei_code',
        'cage_code',
        'duns_number',
        'business_web_page',
        'full_time_employees',
        'average_annual_revenue',
        'dcaa_approved',
        'special_awards',
        'other_comments',
        'sup_doc_id',
        'updated_by'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function updatedUser()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    public function supplierDocument()
    {
        return $this->belongsTo(SupplierDocument::class, 'sup_doc_id', 'id');
    }
}
