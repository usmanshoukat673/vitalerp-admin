<?php

namespace App\Models\Freshservice;

use App\Traits\EncryptableTrait;
use Illuminate\Database\Eloquent\Model;

class FreshserviceAgents extends Model
{
    use EncryptableTrait;

    protected $fillable = [
        'fs_agent_id',
        'config_id',
        'comp_id',
        'email',
        'first_name',
        'last_name',
        'job_title',
        'language',
        'signature',
        'mobile_phone_number',
        'work_phone_number',
        'time_zone',
        'scopes',
        'occasional',
        'active',
        'last_login_at',
        'last_active_at',
        'created',
        'updated',
    ];

    protected $encryptable = [
        'email',
        'first_name',
        'last_name',
        'mobile_phone_number',
        'work_phone_number',
    ];

    public function roles()
    {
        return $this->hasMany(FreshservicegentRoles::class, 'agent_id');
    }
}
