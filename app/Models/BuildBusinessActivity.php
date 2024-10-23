<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuildBusinessActivity extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = ['included' => 'boolean', 'responded' => 'boolean'];
}
