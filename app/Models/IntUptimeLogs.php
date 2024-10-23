<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IntUptimeLogs extends Model
{
    protected $guarded = [];

    protected $casts = [
        'latency' => 'float',
    ];
}
