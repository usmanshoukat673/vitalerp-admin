<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskRegisterStd extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }

    public function control()
    {
        return $this->belongsTo(SectionControl::class, 'control_id');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    public function section()
    {
        return $this->belongsTo(StandardSection::class, 'section_id');
    }

    public function riskowner()
    {
        return $this->belongsTo(User::class, 'risk_owner_id');
    }

    public function updatedby()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}