<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityEvents extends Model
{
    use HasFactory;

    protected $table = 'sevents';

    protected $guarded = [];

    public function source()
    {
        return $this->belongsTo(SecurityEventSource::class, 'sesource_id');
    }
}
