<?php

namespace App\Models;

use App\Models\Watch\WatchDevice;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCompanyDevices extends Model
{
    use HasFactory;

    public $incrementing = false;

    public $primaryKey = ['device_id', 'comp_id', 'user_id'];

    public $fillable = [
        'user_id',
        'comp_id',
        'device_id',
        'nickname',
        'location_type',
        'auto_created'
    ];

    /**
     * The Device which belongs to the Desktop Application
     *
     * @return void
     */
    public function device()
    {
        return $this->belongsTo(WatchDevice::class, 'device_id');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
