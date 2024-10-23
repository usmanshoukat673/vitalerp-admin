<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;

class SuppplierRolesController extends Controller
{
    /**
     * Get all supplier roles.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $roles = Role::select('id', 'name')
        ->where('type', 'supplier')
        ->orderBy('id', 'asc')->get();
        return response()->json($roles, 200);
    }
}
