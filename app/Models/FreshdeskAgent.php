<?php

namespace App\Models;

use App\Traits\EncryptableTrait;
use Illuminate\Database\Eloquent\Model;

class FreshdeskAgent extends Model
{
    use EncryptableTrait;

    protected $fillable = [
        'fd_agent_id',
        'config_id',
        'comp_id',
        'email',
        'name',
        'job_title',
        'language',
        'signature',
        'mobile',
        'phone',
        'time_zone',
        'available_since',
        'type',
        'ticket_scope',
        'available',
        'occasional',
        'active',
        'last_login_at',
        'last_active_at',
        'created',
        'updated',
    ];

    protected $encryptable = [
        'email',
        'name',
        'mobile',
        'phone',
    ];

    public function roles()
    {
        return $this->hasMany(FreshdeskagentRole::class, 'agent_id');
    }
}
