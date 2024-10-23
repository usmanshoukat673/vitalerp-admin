<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuildBusinessProcess extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = ['included' => 'boolean', 'responded' => 'boolean'];

    public function functions()
    {
        return $this->hasMany(BuildFunctions::class, 'deparment_id', 'id');
    }

    public function assets()
    {
        return $this->hasMany(BuildAssets::class, 'deparment_id', 'id');
    }
}
