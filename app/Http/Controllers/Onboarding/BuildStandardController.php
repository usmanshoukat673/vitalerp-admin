<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Models\BuildStandard;
use App\Models\Standard;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class BuildStandardController extends Controller
{
    public function selected_standards($build_id)
    {
        if ($build_id == null || !$build_id) {
            abort(404);
        }

        try {
            $build_id = decrypt($build_id);
            $standars = BuildStandard::select('standard_id')->where(['build_id' => $build_id])->get();

            $filtered_sections = $standars->map(function ($sec) {
                return $sec->standard_id;
            });

            return $filtered_sections->values();

        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }
    
    public function standards()
    {
        return Standard::select('id', 'name', 'description', 'build_ready')->where(['build_ready' => 1])->orWhere(['build_ready' => 2])->get();
    }

    public function startBuilding(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'standard_id' => 'required',
        ]);

        $standard_id = (int) $request->input('standard_id');
        $build_id = (string) $request->input('build_id');

        try {
            $build_id = decrypt($build_id);

            if(!BuildStandard::where(['build_id' => $build_id, 'standard_id' => $standard_id])->first())
            {
                BuildStandard::create(['build_id' => $build_id, 'standard_id' => $standard_id, 'started_at' => now()->toDateTimeString()]);
            }

            return true;
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }
}
