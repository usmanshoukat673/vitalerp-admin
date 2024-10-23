<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserTeamAssigns extends Model
{
    protected $fillable = ['user_assign_id', 'team_id'];
}
