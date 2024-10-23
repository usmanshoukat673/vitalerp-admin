<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $fillable = [
        'name',
        'comp_id',
        'created_by',
        'updated_by',
        'is_default',
        'managed_by',
    ];

    protected $appends = ['enc_id'];

    public function getEncIdAttribute()
    {
        return encrypt($this->id);
    }

    public function users()
    {
        return $this->hasMany(TeamUser::class, 'team_id');
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'created_by')->select('id', 'first_name', 'last_name', 'email');
    }

    public function manager()
    {
        return $this->belongsTo(User::class, 'managed_by')->select('id', 'first_name', 'last_name', 'email');
    }
}
