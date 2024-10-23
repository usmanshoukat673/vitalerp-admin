<?php

namespace App\Http\Controllers\N8N;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CrediatialTestController extends Controller
{
    public function test()
    {
        logger('New request to test');
        return response()->json([
            'status' => 'connected',
            'user' => [
                'name' => request()->user()->name
            ]
        ], 200);
    }
}
