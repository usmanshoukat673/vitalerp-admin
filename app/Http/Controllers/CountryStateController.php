<?php

namespace App\Http\Controllers;

use App\Models\CountryState;
use Illuminate\Http\Request;

class CountryStateController extends Controller
{
    /**
     * Handles GET requests to retrieve a list of country states with only the id and name, sorted by name.
     * 
     * @param string $order The direction of the sort, either 'asc' or 'desc'. Default is 'asc'.
     * @return \Illuminate\Http\JsonResponse A JSON response containing the list of country states.
     */
    public function idName($order = 'asc')
    {
        $countryStates = CountryState::select('id', 'name')->orderBy('name', $order)->get();
        return response()->json($countryStates, 200);
    }
}
