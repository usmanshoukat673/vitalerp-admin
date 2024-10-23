<?php

namespace App\Http\Controllers\Records;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Records;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function module($module_id)
    {
        $module = Module::find($module_id);

        if(!$module) return abort(404);

        return $module;
    }

    public function moduleDetails($module_id){

        $comp_id = request()->input('comp_id');

        // featch unconfigured records 
        $not_configured =  Records::where(['comp_id' => $comp_id, 'module_id' => $module_id, 'configured' => 0])->get();
        $records =  Records::with('createdby')->where(['comp_id' => $comp_id, 'module_id' => $module_id, 'configured' => 1])->get();

        return response()->json([
            'not_configured' => $not_configured,
            'records' => $records
        ]);
    }
}
