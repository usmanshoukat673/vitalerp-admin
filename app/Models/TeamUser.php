<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TeamUser extends Model
{
    protected $fillable = [
        'user_id',
        'team_id',
        'assigned_by',
        'is_default',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id')->select('id', 'first_name', 'last_name', 'email');
    }

    public function assignee()
    {
        return $this->belongsTo(User::class, 'assigned_by')->select('id', 'first_name', 'last_name', 'email');
    }
}
