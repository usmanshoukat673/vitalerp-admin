<?php

namespace App\Models;

use App\Models\Watch\Directory;
use App\Models\Watch\WatchDevice;
use App\Traits\RecordActivity;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class UserCompanies extends Model
{
    use RecordActivity;

    protected $fillable = [
        'user_id',
        'comp_id',
        'role',
        'assigned_by',
        'watch_invited',
        'watch_invited_at',
        'rete_sync'
    ];

    protected $appends = ['company', 'user', 'inviting'];

    protected $casts = ['watch_invited' => 'boolean'];

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function getCompanyAttribute()
    {
        return $this->company()->first();
    }

    public function getInvitingAttribute()
    {
        return false;
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

    /**
     * User/Company Directories
     *
     * @return void
     */
    public function directories()
    {
        return $this->hasMany(Directory::class, 'comp_id', 'comp_id');
    }

    /**
     * User/Company Devices
     *
     * @return void
     */
    public function devices()
    {
        return $this->hasMany(UserCompanyDevices::class, 'comp_id', 'comp_id');
    }
}
