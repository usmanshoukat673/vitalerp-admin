<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MaturityLevel extends Model
{
    protected $fillable = [
        'name',
        'value',
        'description'
    ];

    protected $appends = ['selected'];

    public function getSelectedAttribute()
    {
        return true;
    }
}
