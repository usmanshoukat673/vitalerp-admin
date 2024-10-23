<?php

namespace App\Http\Middleware;

use App\Models\Whistleblow;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class ValidateWhistleId
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $report_link = $request->header('Custom-Whistle-Report-Link');

        if (!$this->isValidCustomReportId($report_link)) {
            return response()->json(['message' => 'Invalid Whistleblowe link'], 404);
        }

        return $next($request);
    }

    private function isValidCustomReportId($report_link)
    {
        if (Whistleblow::where(['report_link' => $report_link])->first()) {
            return true;
        } else {
            return false;
        }
    }
}
