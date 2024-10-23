<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        // apiPrefix: 'api/admin',
        commands: __DIR__.'/../routes/console.php',
        channels: __DIR__.'/../routes/channels.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \App\Http\Middleware\AddCompanyIDToRequest::class,
            \App\Http\Middleware\AddCompanyPolicyPortalLinkToRequest::class,
        ])
        ->web(append: [
            \App\Http\Middleware\VerifyCsrfToken::class
        ])
        ->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,
            'json.response' => \App\Http\Middleware\ForceJsonResponse::class,
            'validate_whistle_id' => \App\Http\Middleware\ValidateWhistleId::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
