<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompStandards extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['selected'];

    public function getSelectedAttribute()
    {
        return true;
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }
}
