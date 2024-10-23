<?php

namespace App\Models;

use App\Traits\RecordActivity;
use Illuminate\Database\Eloquent\Model;

class UserAssigns extends Model
{
    use RecordActivity;

    protected $fillable = [
        'assigned_by', 'assigned_to', 'first_name', 'last_name', 'email', 'status', 'action_taken_at', 'role', 'remember_token'
    ];

    protected $appends = ['company'];

    public function getCompId()
    {
        return $this->assigned_to;
    }

    public function getCompanyAttribute()
    {
        return $this->company()->first();
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'assigned_to');
    }
}
