<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanySection extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function section()
    {
        return $this->belongsTo(StandardSection::class, 'section_id')
            ->select('id', 'name', 'menu_name');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    public function sections()
    {
        return $this->hasMany(UserSection::class, 'parent');
    }
}