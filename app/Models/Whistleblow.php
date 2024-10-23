<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Whistleblow extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function booted()
    {
        static::creating(function ($whistle) {
            $whistle->report_link = Uuid::uuid4()->toString();
        });
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function reports()
    {
        return $this->hasMany(WhistleReport::class, 'whistle_id');
    }

    public function recipients()
    {
        return $this->hasMany(WhistleRecipient::class, 'whistle_id');
    }
}

