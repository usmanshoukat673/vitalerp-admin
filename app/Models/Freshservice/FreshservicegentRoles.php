<?php

namespace App\Models\Freshservice;

use Illuminate\Database\Eloquent\Model;

class FreshservicegentRoles extends Model
{
    protected $guarded = [];

    public function agent()
    {
        return $this->belongsTo(FreshserviceAgents::class, 'agent_id', 'fs_agent_id');
    }

    public function role()
    {
        return $this->belongsTo(FreshserviceRoles::class, 'role_id', 'fs_role_id');
    }
}
