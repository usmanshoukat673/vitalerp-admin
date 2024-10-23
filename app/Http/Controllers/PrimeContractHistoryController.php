<?php

namespace App\Http\Controllers;

use App\Models\PrimeContract;
use Illuminate\Http\Request;

class PrimeContractHistoryController extends Controller
{
    public function index()
    {
        $search = request()->query('search');

        $query = PrimeContract::select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        $list = $query->orderBy('name', 'asc')->get();
        return response()->json($list, 200);
    }
}
