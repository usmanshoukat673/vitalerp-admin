<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class PolicyPortal extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function booted()
    {
        static::creating(function ($whistle) {
            $whistle->link = Uuid::uuid4()->toString();
        });
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }
}
