<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Models\BuildBusinessProcess;
use App\Models\BuildFunctions;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class DepartmentFunctions extends Controller
{
    public function functions($build_id, $standard_id)
    {
        if ($build_id == null || !$build_id || $standard_id == null || !$standard_id) {
            abort(404);
        }

        try {
            $build_id = decrypt($build_id);

            return BuildBusinessProcess::with(['functions' => function ($query) use ($standard_id) {
                    return $query->where(['standard_id' => $standard_id]);
                }])
                ->where([
                    'build_id' => $build_id,
                    'included' => true
                ])->paginate(1);
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }

    public function select(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:build_functions,id',
            'included' => 'required'
        ]);

        $id = $request->input('id');
        $included = $request->input('included');

        BuildFunctions::where(['id' => $id])->update(['included' => $included, 'responded' => 1]);
        return true;
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'name' => 'required',
            'deparment_id' => 'required',
            'standard_id' => 'required',
        ]);

        $name = (string) $request->input('name');
        $build_id = (string) $request->input('build_id');
        $deparment_id = (int) $request->input('deparment_id');
        $standard_id = (int) $request->input('standard_id');

        try {
            $build_id = decrypt($build_id);

            if (!BuildFunctions::where(['build_id' => $build_id, 'name' => $name, 'deparment_id' => $deparment_id, 'standard_id' => $standard_id])->first()) {
                return BuildFunctions::create([
                    'build_id' => $build_id, 'name' => $name, 
                    'included' => 1, 
                    'custom' => 1,
                    'deparment_id' => $deparment_id,
                    'standard_id' => $standard_id
                ]);
            } else {
                return response()->json(['errors' => ['name' => ['Business function already exists.']]], 422);
            }
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }

    public function update(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
            'name' => 'required',
        ]);

        $name = (string) $request->input('name');
        $id = (int) $request->input('id');
        $owner = (string) $request->input('owner');

        if (!BuildFunctions::where(['name' => $name])->where('id', '!=', $id)->first()) {
            return BuildFunctions::where(['id' => $id])->update([
                'name' => $name
            ]);
        } else {
            return response()->json(['errors' => ['name' => ['Business function already exists.']]], 422);
        }
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        $id = (int) $request->input('id');

        if (BuildFunctions::where(['id' => $id])->delete()) {
            return true;
        } else {
            return response()->json(['errors' => ['name' => ['Business function does not exists.']]], 422);
        }
    }
}
