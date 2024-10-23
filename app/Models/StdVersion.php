<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StdVersion extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];

    protected $appends = ['checked'];

    public function getCheckedAttribute()
    {
        return false;
    }
}
