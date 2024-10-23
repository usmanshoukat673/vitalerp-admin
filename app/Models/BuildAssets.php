<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BuildAssets extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function examples()
    {
        return $this->hasMany(BuildAssetExample::class, 'build_asset_id', 'id');
    }
}
