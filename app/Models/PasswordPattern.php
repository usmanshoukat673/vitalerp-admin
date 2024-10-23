<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordPattern extends Model
{
    protected $fillable = ['name', 'rule'];
}
