<?php

namespace App\Models\Freshservice;

use Illuminate\Database\Eloquent\Model;

class FreshserviceRoles extends Model
{
    protected $fillable = [
        'fs_role_id',
        'comp_id',
        'config_id',
        'name',
        'default',
        'description',
        'created',
        'updated',
    ];
}
