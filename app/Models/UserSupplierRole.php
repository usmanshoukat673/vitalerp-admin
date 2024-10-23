<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSupplierRole extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'supplier_id', 'role_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
