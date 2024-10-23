<?php

namespace App\Http\Controllers;

use App\Models\IntUptimeLogs;
use Carbon\Carbon;
use Illuminate\Http\Request;

class IntegrationController extends Controller
{
    public function upTimeLogs(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $logs = IntUptimeLogs::select('id', 'status', 'latency', 'checked_at', 'created_at')
            ->where(['int_id' => $request->input('id')])
            ->where('created_at', '>=', Carbon::now()->subDay())
            // ->orderBy('id', 'asc')
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['logs' => $logs], 200);
        }
    }
}
