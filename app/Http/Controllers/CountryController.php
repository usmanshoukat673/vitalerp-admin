<?php

namespace App\Http\Controllers;

use App\Models\CountryCode;
use Illuminate\Http\Request;

class CountryController extends Controller
{
    /**
     * Handles GET requests to retrieve a list of country states with only the id and name, sorted by name.
     * 
     * @param string $order The direction of the sort, either 'asc' or 'desc'. Default is 'asc'.
     * @return \Illuminate\Http\JsonResponse A JSON response containing the list of country states.
     */
    public function idName($order = 'asc')
    {
        $countryStates = CountryCode::select('id', 'name', 'appha2_code', 'numeric_code')->orderBy('name', $order)->get();
        $us = $countryStates->where('appha2_code', 'US')->where('numeric_code', 840)->first();
        $countryStates = $countryStates->where('appha2_code', '!=', 'US')->where('numeric_code', '!=', 840);
        $countryStates->prepend($us);
        return response()->json($countryStates, 200);
    }
}
