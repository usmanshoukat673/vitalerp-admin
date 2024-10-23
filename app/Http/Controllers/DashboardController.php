<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\UserCompanyDevices;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function apps($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $apps = Application::with('integration')->where(['comp_id' => $comp_id, 'configured' => true])->get();

        if (request()->wantsJson()) {
            return response()->json(['apps' => $apps], 200);
        }
    }

    public function devices($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $user = request()->user();

        #TODO: needs to check the roles

        $devices = UserCompanyDevices::with('device')->where(['comp_id' => $comp_id, 'auto_created' => true])->get();
        if (request()->wantsJson()) {
            return response()->json(['devices' => $devices], 200);
        }
    }
}
