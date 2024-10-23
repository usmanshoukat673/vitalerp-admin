<?php

namespace App\Models\Watch;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectoryActivities extends Model
{
    use HasFactory;

    protected $fillable = [
        'directory_id',
        'event',
        'type',
        'path',
        'name',
        'extention',
        'size',
        'event_date',
        'access_date',
        'write_date',
        'permissions',
    ];
}
