<?php

namespace App\Http\Controllers;

use App\Models\Subject\TextFieldRows;
use Illuminate\Http\Request;

class TextFieldController extends Controller
{
    /**
     * Update TextField Value from the Row
     * 
     * @param $id, $value 
     * @return void 
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:text_field_rows'
        ]);

        $id = $request->input('id');
        $value = $request->input('value');

        TextFieldRows::where(['id' => $id])->update([
            'value' => $value,
            'updated_by' => $request->user()->id
        ]);
    }
}
