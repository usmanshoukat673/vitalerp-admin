<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StdNSatutes extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];

    public function satue()
    {
        return $this->belongsTo(StdSatutes::class, 'satue_id');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }
}
