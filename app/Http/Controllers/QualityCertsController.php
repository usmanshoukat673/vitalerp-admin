<?php

namespace App\Http\Controllers;

use App\Models\QualityCert;
use Illuminate\Http\Request;

class QualityCertsController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/v1/qualitycerts",
     *     summary="Get list of quality certificates",
     *     tags={"Quality Certificates"},
     *     @OA\Parameter(
     *         name="search",
     *         in="query",
     *         description="Search by name",
     *         required=false,
     *         @OA\Schema(
     *             type="string"
     *         )
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful response",
     *         @OA\JsonContent(
     *             type="array",
     *             @OA\Items(ref="#/components/schemas/QualityCert")
     *         )
     *     ),
     *     @OA\Response(
     *         response=401,
     *         description="Unauthorized"
     *     )
     * )
     */
    public function index()
    {
        $search = request()->query('search');

        $query = QualityCert::select('id', 'name');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }
        $list = $query->orderBy('name', 'asc')->get();
        return response()->json($list, 200);
    }
}
