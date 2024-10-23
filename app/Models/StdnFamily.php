<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StdnFamily extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];

    public function family()
    {
        return $this->belongsTo(StdFamily::class, 'family_id');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }
}
