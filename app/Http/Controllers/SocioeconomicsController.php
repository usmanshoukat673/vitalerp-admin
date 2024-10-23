<?php

namespace App\Http\Controllers;

use App\Models\Socioeconomic;
use Illuminate\Http\Request;

class SocioeconomicsController extends Controller
{
    /**
     * Get list of socioeconomic statuses, filtered by search query if provided
     * 
     * @param string|null $search
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $search = request()->query('search');

        $query = Socioeconomic::select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        $list = $query->orderBy('name', 'asc')->get();
        return response()->json($list, 200);
    }
}
