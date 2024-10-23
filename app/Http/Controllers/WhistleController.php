<?php

namespace App\Http\Controllers;

use App\Models\Whistleblow;
use Illuminate\Http\Request;

class WhistleController extends Controller
{
    public function index(Request $request)
    {
        return Whistleblow::with('recipients')->where(['comp_id' => $request->input('comp_id')])->first();
    }
}
