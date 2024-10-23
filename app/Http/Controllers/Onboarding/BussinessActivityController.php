<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Traits\AccountCreation;
use App\Models\BuildBusinessActivity;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class BussinessActivityController extends Controller
{
    use AccountCreation;

    public function activities($build_id)
    {
        if ($build_id == null || !$build_id) {
            abort(404);
        }

        try {
            $build_id = decrypt($build_id);

            return BuildBusinessActivity::where(['build_id' => $build_id])->get();
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }

    public function select(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:build_business_activities,id',
            'included' => 'required'
        ]);

        $id = $request->input('id');
        $included = $request->input('included');

        BuildBusinessActivity::where(['id' => $id])->update(['included' => $included, 'responded' => 1]);
        return true;
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'name' => 'required',
        ]);

        $name = (string) $request->input('name');
        $build_id = (string) $request->input('build_id');

        try {
            $build_id = decrypt($build_id);

            if (!BuildBusinessActivity::where(['build_id' => $build_id, 'name' => $name])->first()) {
                return BuildBusinessActivity::create([
                    'build_id' => $build_id, 'name' => $name,
                    'included' => 1, 'custom' => 1
                ]);
            } else {
                return response()->json(['errors' => ['name' => ['Business activity already exists.']]], 422);
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

        if (!BuildBusinessActivity::where(['name' => $name])->where('id', '!=', $id)->first()) {
            return BuildBusinessActivity::where(['id' => $id])->update([
                'name' => $name,
            ]);
        } else {
            return response()->json(['errors' => ['name' => ['Business activity already exists.']]], 422);
        }
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        $id = (int) $request->input('id');

        if (BuildBusinessActivity::where(['id' => $id])->delete()) {
            return true;
        } else {
            return response()->json(['errors' => ['name' => ['Business activity does not exists.']]], 422);
        }
    }
}
