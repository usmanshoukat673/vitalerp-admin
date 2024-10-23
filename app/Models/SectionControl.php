<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SectionControl extends Model
{
    protected $fillable = [
        'standard_section_id',
        'number',
        'name',
        'description',
        'maturity_level',
        'function_id',
    ];

    protected $casts = [
        'cjpa' => 'boolean',
        'documentation' => 'boolean',
        'baseline_privacy' => 'boolean'
    ];

    public function section()
    {
        return $this->belongsTo(StandardSection::class, 'standard_section_id');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    public function ctlfunction()
    {
        return $this->belongsTo(ControlFunction::class, 'function_id');
    }

    public function models()
    {
        return $this->hasMany(ControlNModels::class, 'control_id');
    }

    public function assets()
    {
        return $this->hasMany(ControlNAssets::class, 'control_id');
    }

    public function maturityLevel()
    {
        return $this->belongsTo(MaturityLevel::class, 'maturity_level');
    }

    public function assessment_question()
    {
        return $this->hasMany(RiskRegisterStd::class, 'control_id')->where(['comp_id' => request()->input('comp_id')]);
    }

    public function properties()
    {
        return $this->hasOne(CompCtrls::class, 'control_id')->where(['comp_id' => request()->input('comp_id')]);
    }

    public function artifacts()
    {
        return $this->hasMany(CompCtrlDocs::class, 'control_id')->where(['comp_id' => request()->input('comp_id')]);
    }

    public function tags()
    {
        return $this->hasMany(CtrlTags::class, 'control_id')->select('control_id', 'tag_id');
    }

    public function mapped()
    {
        return $this->hasMany(ControlMapping::class, 'control_id');
    }

    public function applicability()
    {
        return $this->hasOne(CompCtrls::class, 'control_id');
    }

    public function the_artifacts()
    {
        return $this->hasMany(CompCtrlDocs::class, 'control_id');
    }

    public function tasks()
    {
        return $this->hasMany(TaskControls::class, 'control_id')->where(['comp_id' => request()->input('comp_id')]);
    }

    public function baseline_priorities(){
        return $this->hasMany(ControlBaselinePriority::class, 'control_id');
    }

    // controls questions 
    public function questions()
    {
        return $this->hasMany(ControlQuestionMap::class, 'control_id');
    }
}
