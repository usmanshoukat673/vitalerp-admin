<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (!$request->expectsJson()) {

            if ($request->path() === 'oauth/authorize') {
                if (isset($request->query()['client_id'])) {
                    $params = array(
                        'client_id' => $request->query()['client_id'],
                        'return_to' => $request->getRequestUri(),
                    );
                    return route('app', $params);
                } else {
                    return route('login');
                }
            }

            return route('login');
        }
    }
}
