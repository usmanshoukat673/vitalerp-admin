<?php

namespace App\Http\Controllers\Subject;

use App\Http\Controllers\Controller;
use App\Models\Subject;
use App\Traits\SubjectsHelper;

class SubjectManager extends Controller
{
    use SubjectsHelper;

    public function index($id)
    {
        if($id == 0 || $id == null)
        {
            abort(404);
        }

        $subject = Subject::with(['rows', 'columns'])->find($id);

        $subject->columns = $subject->columns->filter(function ($column) {
             $column->fields = $this->getFields($column->id, $column->field_model);
        });

        if(!$subject)
        {
            abort(404);
        }

        return $subject;
    }

    public function all($project_id, $comp_id){
        if($project_id == 0 || $project_id == null)
        {
            abort(404);
        }

        $subjects = Subject::select('id', 'project_id', 'subject_type')->where(['project_id' => $project_id])->get();

        if(!$subjects)
        {
            abort(404);
        }

        return $subjects;
    }
}
