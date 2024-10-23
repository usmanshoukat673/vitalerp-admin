<?php

namespace App\Http\Controllers;

use App\Filters\StandardsFilter;
use App\Models\Standard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StoreController extends Controller
{
    /// <summary>
    /// Work the filters 
    /// Returns products based on the request 
    /// </summary>
    public function bundleUp(Request $request, StandardsFilter $standardsFilter)
    {
        return Standard::where(['active' => 1])
        ->orderBy('name', 'asc')
        ->filter($standardsFilter)
        ->get(['standards.*']);
    }

    public function featuredProducts()
    {
        $standards = Standard::select('id', 'name', 'yearly_price', 'monthly_price', 'image_data', 'description')->where(['active' => 1, 'featured' => 1])
        ->get();

        return $standards;
    }
}
