<?php

namespace App\Http\Controllers;

use App\Models\KanbanColumn;
use Illuminate\Http\Request;

class KanbanManager extends Controller
{
    public function rename(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:kanban_columns',
            'name' => 'required'
        ]);

        $id = $request->input('id');
        $name = $request->input('name');

        $column = KanbanColumn::find($id);

        if(!$column)
        {
            abort(404);
        }

        $column->custom_name = $name;
        $column->changed_by = $request->user()->id;
        $column->save();

        return response()->json([
            'column' => $column
        ], 200);
    }

    public function columns($project_id, $comp_id)
    {
        if($project_id == null || !$comp_id)
        {
            abort(404);
        }

        if($project_id === 'all' || $project_id == 0)
        {
            $project_id = 0;
        }

        $columns = KanbanColumn::
        select('id', 'default_name', 'custom_name', 'project_id', 'comp_id')
        ->where([
            'comp_id' => $comp_id,
            'project_id' => $project_id
        ])->get();

        return response()->json([
            'columns' => $columns
        ], 200);
    }
}
