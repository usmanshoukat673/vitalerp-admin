<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StdnVersion extends Model
{
    use HasFactory;

     protected $hidden = ['created_at', 'updated_at'];

    public function version()
    {
        return $this->belongsTo(StdVersion::class, 'version_id');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }
}
