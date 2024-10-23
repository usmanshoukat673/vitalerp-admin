<?php

namespace App\Http\Controllers;

use App\Models\Lanscape;

class LanscapeController extends Controller
{
    public function list($module_id)
    {
        $lan_assets = Lanscape::
        with(['childs.records' => function($q) {
            $q->with('createdby')->where(['comp_id' => request()->comp_id]);
        }])
        ->where(['parent' => null, 'module_id' => $module_id])
        ->where(function ($q) {
            $q->where(['comp_id' => null])
                ->orWhere(['comp_id' => request()->comp_id]);
        })
        ->orderBy('name', 'asc')->get();

        if (request()->wantsJson()) {
            return response()->json(['lan_assets' => $lan_assets]);
        }

        return $lan_assets;
    }
}
