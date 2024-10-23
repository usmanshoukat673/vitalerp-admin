<?php

namespace App\Http\Controllers;

use App\Models\Ethnicity;
use Illuminate\Http\Request;

class EthnicitiesController extends Controller
{
    /**
     * Get paginated list of ethnicities with optional search.
     *
     * @queryParam search string Search by name.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $search = request()->query('search');

        $query = Ethnicity::select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        $list = $query->orderBy('name', 'asc')->get();
        return response()->json($list, 200);
    }
}
