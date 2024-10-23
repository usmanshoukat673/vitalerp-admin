<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'phone',
        'contact_person',
        'email',
        'website',
        'updated_by',
        'timezone',
        'description'
    ];

    public function companies()
    {
        return $this->belongsToMany(Company::class, 'supplier_companies', 'supplier_id', 'comp_id')->withTimestamps();
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'supplier_users', 'supplier_id', 'user_id')
            ->withTimestamps();
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_supplier_roles', 'supplier_id', 'role_id')
            ->withPivot('user_id')
            ->withTimestamps();
    }

    // If you need to get the roles of a specific user in this supplier
    public function userRoles($userId)
    {
        return $this->hasMany(UserSupplierRole::class, 'supplier_id')
            ->where('user_id', $userId);
    }

    public function supplierUsers()
    {
        return $this->hasManyThrough(User::class, SupplierUser::class, 'supplier_id', 'id', 'id', 'user_id');
    }

    public function locations()
    {
        return $this->hasMany(SupplierLocation::class, 'supplier_id');
    }

    public function defaultLocation()
    {
        return $this->hasOne(SupplierLocation::class, 'supplier_id')
            ->where('default', true);
    }

    public function domains()
    {
        return $this->belongsToMany(CompanyDomain::class, 'supplier_domains', 'supplier_id', 'domain_id')
            ->withTimestamps();
    }

    public function laborCategoryDetails()
    {
        return $this->hasMany(SupplierLaborCategoryDetail::class);
    }
}
