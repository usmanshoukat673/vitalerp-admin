<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddCompanyIDToRequest
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
        if ($request->header('X-Company-ID')) {
            if (!$request->has('comp_id') && $request->header('X-Company-ID')) {
                $request->merge(['comp_id' => $request->header('X-Company-ID')]);
            }
        }

        return $next($request);
    }
}
