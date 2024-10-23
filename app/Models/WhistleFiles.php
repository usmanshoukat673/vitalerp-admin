<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhistleFiles extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function whistle_report()
    {
        return $this->belongsTo(WhistleReport::class, 'whistle_report_id');
    }
}
