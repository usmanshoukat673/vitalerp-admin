<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StdFamily extends Model
{
    use HasFactory;

    protected $appends = ['checked'];

     protected $hidden = ['created_at', 'updated_at'];

    public function getCheckedAttribute()
    {
        return false;
    }
}