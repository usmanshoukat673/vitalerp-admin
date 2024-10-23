<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SecurityEventSource extends Model
{
    use HasFactory;

    protected $table = 'se_sources';

    protected $guarded = [];

    public function events()
    {
        return $this->hasMany(SecurityEvents::class, 'sesource_id');
    }
}
