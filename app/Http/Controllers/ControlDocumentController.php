<?php

namespace App\Http\Controllers;

use App\Models\CompCtrlDocs;
use Illuminate\Http\Request;

class ControlDocumentController extends Controller
{
    public function toggleDocumentVisibility(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:comp_ctrl_docs,id',
            'pp_visiblity' => 'required'
        ]);

        $id = $request->input('id');
        $pp_visiblity = (bool) $request->input('pp_visiblity');

        return CompCtrlDocs::where(['id' => $id])->update(['pp_visiblity' => $pp_visiblity]);
    }
}
