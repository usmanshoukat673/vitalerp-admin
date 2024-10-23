<?php

namespace App\Http\Controllers;

use App\Models\CompCtrlDocs;
use App\Models\CompCtrls;
use App\Models\SectionControl;
use Illuminate\Http\Request;

class ControlProfileController extends Controller
{

    public function index($control_id, $comp_id){
        $profile = SectionControl::select('id', 'name', 'description', 'number', 'short_name', 'additional_info')
        ->find($control_id);

        $properties = CompCtrls::where(['comp_id' => $comp_id, 'control_id' => $control_id])->first();

        return [$profile, $properties];
    }

    public function artifacts($comp_id, $control_id)
    {
        return CompCtrlDocs::with('document')
            ->where(['comp_id' => $comp_id, 'control_id' => $control_id])->get();
    }
}
