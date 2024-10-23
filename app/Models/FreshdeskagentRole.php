<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreshdeskagentRole extends Model
{
    protected $guarded = [];

    public function agent()
    {
        return $this->belongsTo(FreshdeskAgent::class, 'agent_id', 'fd_agent_id');
    }

    public function role()
    {
        return $this->belongsTo(FreshdeskRoles::class, 'role_id', 'fd_role_id');
    }
}
