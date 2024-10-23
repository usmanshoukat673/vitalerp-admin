<?php

namespace App\Models\Freshservice;

use App\Traits\EncryptableTrait;
use Illuminate\Database\Eloquent\Model;

class Freshservice extends Model
{
    use EncryptableTrait;

    protected $fillable = [
        'comp_id',
        'user_id',
        'application_id',
        'api_key',
        'domain_name',
        'api_url',
        'agents',
        'agent_profile',
        'roles',
        'tickets',
        'connected',
        'configured',
        'expired',
        'expired_at',
        'last_refreshed',
    ];

    protected $encryptable = [
        'api_key',
        'domain_name',
    ];

    protected $casts = [
        'connected' => 'boolean',
        'expired' => 'boolean',
        'configured' => 'boolean',
    ];
}
