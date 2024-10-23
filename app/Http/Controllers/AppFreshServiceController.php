<?php

namespace App\Http\Controllers;

use App\Models\Freshservice\Freshservice;
use App\Models\Freshservice\FreshserviceAgents;
use App\Models\Freshservice\FreshserviceTickets;
use Illuminate\Http\Request;

class AppFreshServiceController extends Controller
{
    public function agents(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'application_id' => 'required|exists:applications,id',
        ]);

        $comp_id = $request->input('comp_id');
        $application_id = $request->input('application_id');

        $freshservice = Freshservice::select('id', 'configured', 'connected', 'expired', 'expired_at')
            ->where(['application_id' => $application_id, 'comp_id' => $comp_id])
            ->first();

        $agents = FreshserviceAgents::with('roles.role')->where(['comp_id' => $comp_id, 'config_id' => $freshservice->id])->get();
        $tickets = FreshserviceTickets::where(['comp_id' => $comp_id, 'config_id' => $freshservice->id])->limit(10)->orderBy('created', 'desc')->get();

        if (request()->wantsJson()) {
            return response()->json(['agents' => $agents, 'freshservice' => $freshservice, 'tickets' => $tickets], 200);
        }
    }
}
