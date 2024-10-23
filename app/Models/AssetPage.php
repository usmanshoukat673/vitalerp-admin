<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssetPage extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function assets()
    {
        return $this->hasMany(BuildAssets::class, 'type', 'key');
    }
}
