<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WhistleReport extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'enc_id', 
    ];

    public function getEncIdAttribute()
    {
        return encrypt($this->id);
    }

    public function getDescriptionAttribute($value)
    {
        return decrypt($value);
    }

    public function whistle()
    {
        return $this->belongsTo(Whistleblow::class, 'whistle_id');
    }

    public function category()
    {
        return $this->belongsTo(WhistleCategory::class, 'wshigle_category_id');
    }

    public function files()
    {
        return $this->hasMany(WhistleFiles::class, 'whistle_report_id');
    }
}
