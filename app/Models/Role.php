<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_company_roles')
                    ->withPivot('comp_id')
                    ->withTimestamps();
    }

    // public function permissions()
    // {
    //     return $this->belongsToMany(Permission::class, 'role_permissions')
    //                 ->withTimestamps();
    // }

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'user_company_roles', 'role_id', 'comp_id')
                    ->withPivot('user_id')
                    ->withTimestamps();
    }
}
