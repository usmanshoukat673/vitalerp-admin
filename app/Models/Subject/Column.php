<?php

namespace App\Models\Subject;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Column extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = ['description' => 'string'];

    public static function addColumn($subject_id, $field_type_id, $field_model, $component, $name, $comp_id, $project_id, $description = null)
    {
        return self::create([
            'subject_id' => $subject_id,
            'field_type_id' => $field_type_id,
            'field_model' => $field_model,
            'component' => $component,
            'name' => $name,
            'comp_id' => $comp_id,
            'project_id' => $project_id,
            'created_by' => request()->user()->id,
            'description' => $description
        ]);
    }
}
