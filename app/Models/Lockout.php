<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lockout extends Model
{
    protected $fillable = ['email', 'used'];
}
