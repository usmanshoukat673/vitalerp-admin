<?php

namespace App\Http\Controllers;

use App\Models\Freshdesk;
use App\Models\FreshdeskAgent;
use App\Models\FreshdeskTicket;
use Illuminate\Http\Request;

class AppFreshDeskController extends Controller
{
    public function agents(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'application_id' => 'required|exists:applications,id',
        ]);

        $comp_id = $request->input('comp_id');
        $application_id = $request->input('application_id');

        $freshdesk = Freshdesk::select('id', 'configured', 'connected', 'expired', 'expired_at')
            ->where(['application_id' => $application_id, 'comp_id' => $comp_id])->first();

        $agents = FreshdeskAgent::with('roles.role')->where(['comp_id' => $comp_id, 'config_id' => $freshdesk->id])->get();
        $tickets = FreshdeskTicket::where(['comp_id' => $comp_id, 'config_id' => $freshdesk->id])->limit(10)->orderBy('created', 'desc')->get();

        if (request()->wantsJson()) {
            return response()->json(['agents' => $agents, 'freshdesk' => $freshdesk, 'tickets' => $tickets], 200);
        }
    }
}
