<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DomainLaborCategory extends Model
{
    use HasFactory;

    protected $table = 'domain_labor_categories';

    protected $fillable = [
        'domain_id', 'labor_category_id'
    ];

    public function domain()
    {
        return $this->belongsTo(Domain::class, 'domain_id');
    }

    public function laborCategory()
    {
        return $this->belongsTo(LaborCategory::class, 'labor_category_id');
    }
}
