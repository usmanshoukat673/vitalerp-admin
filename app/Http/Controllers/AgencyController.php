<?php

namespace App\Http\Controllers;

use App\Models\Agency;
use Illuminate\Http\Request;

class AgencyController extends Controller
{
    public function index()
    {
        $search = request()->query('search');

        $query = Agency::select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        $list = $query->orderBy('name', 'asc')->get();
        return response()->json($list, 200);
    }
}
