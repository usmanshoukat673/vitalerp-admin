<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreshdeskRoles extends Model
{
    protected $fillable = [
        'fd_role_id',
        'comp_id',
        'config_id',
        'name',
        'default',
        'description',
        'created',
        'updated',
    ];
}
