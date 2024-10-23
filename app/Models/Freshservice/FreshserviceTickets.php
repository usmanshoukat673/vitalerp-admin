<?php

namespace App\Models\Freshservice;

use Illuminate\Database\Eloquent\Model;

class FreshserviceTickets extends Model
{
    protected $fillable = [
        'fs_ticket_id',
        'config_id',
        'comp_id',
        'subject',
        'priority',
        'type',
        'source',
        'data',
        'created',
        'updated',
    ];

    protected $casts = [
        'data' => 'json',
        'tags' => 'json'
    ];
}
