<?php

namespace App\Http\Controllers\Watch;

use App\Http\Controllers\Controller;
use App\Models\UserCompanies;
use App\Models\Watch\Directory;
use App\Traits\APIResponseCleaner;
use Illuminate\Http\Request;

class UserController extends Controller
{
    use APIResponseCleaner;

    public function user(Request $request)
    {
        return response()->json($this->cleanUser($request->user()), 200);
    }

    public function companies(Request $request)
    {
        $user = $request->user();

        $companies = UserCompanies::select('id', 'user_id', 'comp_id', 'role')->with(['company' => function ($query) {
            return $query->select('id', 'name', 'address', 'city', 'state', 'country', 'postal_code', 'timezone');
        }])
            ->with(['directories' => function ($query) use ($user) {
                $query->where(['user_id' => $user->id]);
            }])
            ->with(['devices' => function ($query) {
                $query->where(['auto_created' => false]);
            }])
            ->with(['devices.device' => function ($query) use ($user) {
                $query->where(['user_id' => $user->id]);
            }])
            ->where(['user_id' => $user->id, 'watch_invited' => 1])->get()
            ->each->setAppends([])
            ->toArray();

        // $companies = $companies->makeHidden(['user']);

        $companies = $this->cleanCompanies($companies);

        return response()->json(['companies' => $companies], 200);
    }

    public function directories(Request $request)
    {
        $user = $request->user();

        $directories = Directory::where([
            'user_id' => $user->id,
        ])->get();

        return response()->json(['directories' => $directories], 200);
    }
}
