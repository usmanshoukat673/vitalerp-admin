<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionControls extends Model
{
    use HasFactory;

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function control()
    {
        return $this->belongsTo(SectionControl::class, 'control_id')->select('id', 'name', 'number', 'description', 'standard_id', 'standard_section_id');
    }
}
