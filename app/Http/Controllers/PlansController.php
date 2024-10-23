<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use Illuminate\Http\Request;

class PlansController extends Controller
{
    public function plans()
    {
        return Plan::with('features.feature')->get();
    }
}
