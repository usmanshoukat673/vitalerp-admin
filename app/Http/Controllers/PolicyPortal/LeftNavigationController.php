<?php

namespace App\Http\Controllers\PolicyPortal;

use App\Http\Controllers\Controller;
use App\Models\SharedStandard;
use App\Models\StandardSection;
use Illuminate\Http\Request;

class LeftNavigationController extends Controller
{
    public function domains($standard_id)
    {
        if (!$standard_id) {
            abort(404, "Invalid Standard");
        }

        $comp_id = request('comp_id');
        $user_id = request()->user()->id;

        // look if standard is shared 
        if (!SharedStandard::where(['comp_id' => $comp_id, 'standard_id' => $standard_id])
            ->first()) {
            abort(404, "Standard not found");
        }

        return StandardSection::
        select('id', 'menu_name', 'abbreviation', 'description')
            ->with(['sections' => function($q){
                $q->select('id', 'parent', 'menu_name', 'abbreviation', 'description');
            }])
            ->where(['parent' => null])
            ->where('standard_id', $standard_id)
            ->get();
    }
}
