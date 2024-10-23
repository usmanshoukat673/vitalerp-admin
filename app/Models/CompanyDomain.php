<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class CompanyDomain extends Model
{
    use HasFactory;

    protected $table = 'domains';

    protected $fillable = [
        'name',
        'slug',
        'description',
        'comp_id'
    ];

    public function getSlugAttribute()
    {
        return Str::slug($this->name);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = $value;
        $this->attributes['slug'] = Str::slug($value);
    }

    public function laborCategories()
    {
        return $this->belongsToMany(LaborCategory::class, 'domain_labor_categories', 'domain_id', 'labor_category_id');
    }

    public function suppliers()
    {
        return $this->belongsToMany(Supplier::class, 'supplier_domains', 'domain_id', 'supplier_id')
            ->withTimestamps();
    }

    public function laborCategoryDetails()
    {
        return $this->hasMany(SupplierLaborCategoryDetail::class, 'domain_id');
    }
}
