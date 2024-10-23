<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StdNFocuses extends Model
{
    use HasFactory;

    protected $hidden = ['created_at', 'updated_at'];

    public function focus()
    {
        return $this->belongsTo(StdFocus::class, 'focus_id');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }
}
