<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CtrlTags extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function tag()
    {
        return $this->belongsTo(ControlTag::class, 'tag_id');
    }

    public function control()
    {
        return $this->belongsTo(SectionControl::class, 'control_id');
    }
}
