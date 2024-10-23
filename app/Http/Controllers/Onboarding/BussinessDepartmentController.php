<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Traits\AccountCreation;
use App\Models\BuildBusinessProcess;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class BussinessDepartmentController extends Controller
{
    use AccountCreation;

    public function depts($build_id)
    {
        if ($build_id == null || !$build_id) {
            abort(404);
        }

        try {
            $build_id = decrypt($build_id);

            return BuildBusinessProcess::where(['build_id' => $build_id])->get();
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }


    public function selectedDepts($build_id)
    {
        if ($build_id == null || !$build_id) {
            abort(404);
        }

        try {
            $build_id = decrypt($build_id);

            return BuildBusinessProcess::select('id', 'name')->where(['build_id' => $build_id, 'included' => 1])->get();
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }

    

    public function select(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:build_business_processes,id',
            'included' => 'required'
        ]);

        $id = $request->input('id');
        $included = $request->input('included');

        BuildBusinessProcess::where(['id' => $id])->update(['included' => $included, 'responded' => 1]);
        return true;
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'name' => 'required',
            'owner' => 'required',
        ]);

        $name = (string) $request->input('name');
        $build_id = (string) $request->input('build_id');
        $owner = (string) $request->input('owner');

        try {
            $build_id = decrypt($build_id);

            if (!BuildBusinessProcess::where(['build_id' => $build_id, 'name' => $name])->first()) {
                return BuildBusinessProcess::create([
                    'build_id' => $build_id, 'name' => $name, 'owner' => $owner,
                    'included' => 1, 'custom' => 1
                ]);
            } else {
                return response()->json(['errors' => ['name' => ['Business process already exists.']]], 422);
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
            'owner' => 'required',
        ]);

        $name = (string) $request->input('name');
        $id = (int) $request->input('id');
        $owner = (string) $request->input('owner');

        if (!BuildBusinessProcess::where(['name' => $name])->where('id', '!=', $id)->first()) {
            return BuildBusinessProcess::where(['id' => $id])->update([
                'name' => $name, 'owner' => $owner
            ]);
        } else {
            return response()->json(['errors' => ['name' => ['Business process already exists.']]], 422);
        }
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        $id = (int) $request->input('id');

        if (BuildBusinessProcess::where(['id' => $id])->delete()) {
            return true;
        } else {
            return response()->json(['errors' => ['name' => ['Business process does not exists.']]], 422);
        }
    }

    public function saveOwner(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:build_business_processes,id',
            'owner' => 'required'
        ]);

        $id = $request->input('id');
        $owner = $request->input('owner');

        BuildBusinessProcess::where(['id' => $id])->update(['owner' => $owner]);
        return true;
    }
}
