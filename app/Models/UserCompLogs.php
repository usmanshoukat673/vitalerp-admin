<?php

namespace App\Models;

use App\Traits\RecordActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UserCompLogs extends Model
{
    use RecordActivity;

    protected $fillable = [
        'user_id', 'comp_id', 'ip', 'system'
    ];

    protected $appends = ['company', 'user'];

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function getCompanyAttribute()
    {
        return $this->company()->first();
    }

    public function getUserAttribute()
    {
        return DB::table('users')->select('id', 'first_name', 'last_name', 'email')->where('id', $this->user_id)->first();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function getCompId()
    {
        return $this->comp_id;
    }

    public function getUserId()
    {
        return $this->user_id;
    }
}
