<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    use HasFactory;

    protected $fillable = [];

    protected $casts = [
        'description' => 'array'
    ];

    public function features()
    {
        return $this->hasMany(Feature::class, 'plan_id');
    }
}
