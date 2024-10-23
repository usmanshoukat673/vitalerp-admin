<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Models\AssetPage;
use App\Models\BuildAssetExample;
use App\Models\BuildAssets;
use App\Models\BuildBusinessProcess;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class DepartmentAssets extends Controller
{
    public function assets($build_id, $standard_id)
    {
        if ($build_id == null || !$build_id || $standard_id == null || !$standard_id) {
            abort(404);
        }

        try {
            $build_id = decrypt($build_id);
            return AssetPage::with(['assets' => function ($query) use ($standard_id, $build_id) {
                    return $query->where(['standard_id' => $standard_id, 'build_id' => $build_id])->with(['examples' => function($asset_query) {
                        return $asset_query->select('id', 'name', 'selected', 'build_asset_id');
                    }]);
                }])
                ->paginate(1);
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }

    public function select(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:build_assets,id',
            'included' => 'required'
        ]);

        $id = $request->input('id');
        $included = $request->input('included');

        BuildAssets::where(['id' => $id])->update(['included' => $included, 'responded' => 1]);
        return true;
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'name' => 'required',
            'deparment_id' => 'required',
            'standard_id' => 'required',
            'asset_type' => 'required'
        ]);

        $name = (string) $request->input('name');
        $build_id = (string) $request->input('build_id');
        $deparment_id = (int) $request->input('deparment_id');
        $standard_id = (int) $request->input('standard_id');
        $type = (string) $request->input('asset_type');

        try {
            $build_id = decrypt($build_id);

            if (!BuildAssets::where(['build_id' => $build_id, 'name' => $name, 'deparment_id' => $deparment_id, 'standard_id' => $standard_id])->first()) {
                $asset = BuildAssets::create([
                    'build_id' => $build_id, 'name' => $name, 
                    'included' => 1, 
                    'custom' => 1,
                    'deparment_id' => $deparment_id,
                    'standard_id' => $standard_id,
                    'type' => $type
                ]);

                return BuildAssets::with(['examples' => function($asset_query) {
                    return $asset_query->select('id', 'name', 'selected', 'build_asset_id');
                }])->find($asset->id);
                
            } else {
                return response()->json(['errors' => ['name' => ['Business asset already exists.']]], 422);
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

        if (!BuildAssets::where(['name' => $name])->where('id', '!=', $id)->first()) {
            return BuildAssets::where(['id' => $id])->update([
                'name' => $name
            ]);
        } else {
            return response()->json(['errors' => ['name' => ['Business asset already exists.']]], 422);
        }
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        $id = (int) $request->input('id');

        if (BuildAssets::where(['id' => $id])->delete()) {

            BuildAssetExample::where(['build_asset_id' => $id])->delete();

            return true;
        } else {
            return response()->json(['errors' => ['name' => ['Business asset does not exists.']]], 422);
        }
    }
}
