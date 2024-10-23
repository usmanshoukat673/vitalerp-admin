<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskControls extends Model
{
    use HasFactory;

    protected $guarded = [];

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

    public function company()
    {
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id')->where(['comp_id' => request()->input('comp_id')]);
    }
}
