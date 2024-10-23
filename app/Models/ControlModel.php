<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ControlModel extends Model
{
    use HasFactory;

    protected $appends = ['selected'];

    public function getSelectedAttribute()
    {
        return true;
    }
}
