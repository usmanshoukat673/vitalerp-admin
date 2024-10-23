<?php

namespace App\Http\Controllers\Subject;

use App\Http\Controllers\Controller;
use App\Models\Subject\Column;
use App\Models\Subject\Row;
use App\Traits\SubjectsHelper;
use Illuminate\Http\Request;

class RowController extends Controller
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
            'subject_id' => 'required|exists:subjects,id',
        ]);

        $subject_id = $request->input('subject_id');

        $row = Row::create([
            'subject_id' => $subject_id
        ]);

        $columns = Column::select('id', 'field_model')->where(['subject_id' => $subject_id])->get();

        if (count($columns)) {
            foreach ($columns as $column) {
               $column->field_model::addField($subject_id, $column->id, $row->id, $this->user->id);
            }
        }

        $columns = Column::where(['subject_id' => $subject_id])->get();

        $columns = $columns->filter(function ($column) {
            $column->fields = $this->getFields($column->id, $column->field_model);
            return $column;
        });

        if ($request->wantsJson()) {
            return response()->json(['row' => $row, 'columns' => $columns]);
        }

        return ['row' => $row, 'columns' => $columns];
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'subject_id' => 'required|exists:subjects,id',
            'row_id' => 'required|exists:rows,id',
        ]);

        $subject_id = $request->input('subject_id');
        $row_id = $request->input('row_id');
        
        $columns = Column::select('id', 'field_model')->where(['subject_id' => $subject_id])->get();

        if (count($columns)) {
            foreach ($columns as $column) {
               $column->field_model::deleteRow($subject_id, $row_id);
            }
        }

        Row::where([
            'id' => $row_id
        ])->delete();

        return true;
    }
}
