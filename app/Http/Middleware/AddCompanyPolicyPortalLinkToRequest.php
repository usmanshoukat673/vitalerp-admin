<?php

namespace App\Http\Middleware;

use App\Models\PolicyPortal;
use Closure;
use Illuminate\Http\Request;

class AddCompanyPolicyPortalLinkToRequest
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
        if ($request->header('X-Company-Portal-Link-ID')) {
            if (!$request->has('portal_link') && $request->header('X-Company-Portal-Link-ID')) {

                $pp = PolicyPortal::where(['link' => $request->header('X-Company-Portal-Link-ID')])->first();

                if ($pp) {
                    $request->merge(['portal_link' => $pp->id]);
                    $request->merge(['comp_id' => $pp->comp_id]);
                } else {
                    return response(['message' => 'Invalid policy panel link'], 404);
                }
            }
        }
        return $next($request);
    }
}
