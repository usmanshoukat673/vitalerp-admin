<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCompanyRole extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'comp_id', 'role_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
