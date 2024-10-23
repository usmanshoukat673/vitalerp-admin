<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MFAActivities extends Model
{
    protected $fillable = [
        'user_id', 'ip', 'system', 'enable'
    ];
}
