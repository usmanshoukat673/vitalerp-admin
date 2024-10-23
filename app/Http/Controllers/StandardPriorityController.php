<?php

namespace App\Http\Controllers;

use App\Models\CompStandards;
use Illuminate\Http\Request;

class StandardPriorityController extends Controller
{
    public function changePiority(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
            'comp_id' => 'required',
            'priority' => 'required',
        ]);

        return CompStandards::where([
            'comp_id' => $request->input('comp_id'),
            'standard_id' => $request->input('standard_id')
        ])->update([
            'priority' => $request->input('priority')
        ]);
    }
}
