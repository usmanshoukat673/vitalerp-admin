<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ControlQuestionMap extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function question()
    {
        return $this->belongsTo(ControlQuestion::class, 'question_id');
    }

    public function company_question()
    {
        return $this->belongsTo(CompanyControlQuestion::class, 'question_id')->where(['comp_id' => request()->comp_id]);
    }
}
