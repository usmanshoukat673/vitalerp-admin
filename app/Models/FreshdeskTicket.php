<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FreshdeskTicket extends Model
{
    protected $fillable = [
        'fd_ticket_id',
        'config_id',
        'comp_id',
        'subject',
        'priority',
        'type',
        'tags',
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
