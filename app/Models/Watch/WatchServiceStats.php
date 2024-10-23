<?php

namespace App\Models\Watch;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WatchServiceStats extends Model
{
    use HasFactory;

    protected $fillable = [
        'device_id',
        'comp_id',
        'user_id',
        'status',
        'event_date',
    ];
}
