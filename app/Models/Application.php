<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = [
        'user_id',
        'comp_id',
        'integration_id',
        'configured',
    ];

    public function integration()
    {
        return $this->belongsTo(Integration::class, 'integration_id');
    }
}
