<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ControlMapping extends Model
{
    use HasFactory;

    protected $fillable = [
        'control_id',
        'mapped_to'
    ];

    public function control()
    {
        return $this->belongsTo(SectionControl::class, 'mapped_to');
    }
}
