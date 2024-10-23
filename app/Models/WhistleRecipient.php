<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhistleRecipient extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function whistle()
    {
        return $this->belongsTo(Whistleblow::class, 'whistle_id');
    }
}
