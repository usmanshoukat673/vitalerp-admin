<?php

namespace App\Http\Controllers\Subject;

use App\Http\Controllers\Controller;
use App\Models\Subject\Column;
use App\Models\Subject\Row;
use App\Traits\SubjectsHelper;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    use SubjectsHelper;

    private $user;

    public function __construct()
    {
        $this->user = request()->user('api');
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'subject_id' => 'required',
            'field_type_id' => 'required',
            'field_model' => 'required',
            'component' => 'required',
            'comp_id' => 'required',
            'project_id' => 'required',
            'name' => 'required'
        ]);

        $subject_id = $request->input('subject_id');
        $field_type_id = $request->input('field_type_id');
        $field_model = $request->input('field_model');
        $component = $request->input('component');
        $comp_id = $request->input('comp_id');
        $project_id = $request->input('project_id');
        $name = $request->input('name');
        $description = $request->input('description');

        $rows = Row::select('id')->where(['subject_id' => $subject_id])->get();

        $column = Column::addColumn($subject_id, $field_type_id, $field_model, $component, $name, $comp_id, $project_id, $description);

        if (count($rows)) {
            foreach ($rows as $row) {
                $field_model::addField($subject_id, $column->id, $row->id);
            }
        }

        $column->fields = $this->getFields($column->id, $column->field_model);

        return $column;

    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:columns',
            'name' => 'required',
        ]);

        $id = $request->input('id');
        $name = $request->input('name');
        $description = $request->input('description');

        Column::where(['id' => $id])->update([
            'name' => $name,
            'description' => $description,
            'updated_by' => $request->user()->id
        ]);

        return Column::select('id', 'name', 'description')->find($id);
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:columns',
        ]);

        $id = $request->input('id');

        $column = Column::select('id', 'subject_id', 'field_model')->find($id);

        $column->field_model::deleteField($column->subject_id, $column->id);

        Column::where(['id' => $id])->delete();

        return $id;
    }
}
