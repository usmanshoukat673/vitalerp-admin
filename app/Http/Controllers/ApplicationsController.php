<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Integration;
use Illuminate\Http\Request;

class ApplicationsController extends Controller
{
    public function installed(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'app_id' => 'required|exists:integrations,id'
        ]);

        $app = Application::where(['integration_id' => $request->input('app_id'), 'comp_id' => $request->input('comp_id')])->first();

        if (request()->wantsJson()) {
            return response()->json(['installed' => ($app ? true : false)], 200);
        }
    }

    public function install(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'app_id' => 'required|exists:integrations,id'
        ]);

        $user = $request->user();

        $app = Application::create(['integration_id' => $request->input('app_id'), 'comp_id' => $request->input('comp_id'), 'user_id' => $user->id]);

        $app = Application::with('integration')->find($app->id);

        if (request()->wantsJson()) {
            return response()->json(['installed' => true, 'app' => $app, 'redirect' => ($app->integration->config_url == null ? '/dashboard' : $app->integration->config_url)], 200);
        }
    }

    public function list($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $list = Application::with('integration')->where(['comp_id' => $comp_id])->get();

        if (request()->wantsJson()) {
            return response()->json(['list' => $list], 200);
        }
    }
}
