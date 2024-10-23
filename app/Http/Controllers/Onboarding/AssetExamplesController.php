<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Models\BuildAssetExample;
use Illuminate\Http\Request;

class AssetExamplesController extends Controller
{
    public function add(Request $request)
    {
        $this->validate($request, [
            'build_asset_id' => 'required|exists:build_assets,id',
            'name' => 'required',
            'standard_id' => 'required',
        ]);

        $name = (string) $request->input('name');
        $build_asset_id = (int) $request->input('build_asset_id');
        $standard_id = (int) $request->input('standard_id');

        if (!BuildAssetExample::where(['build_asset_id' => $build_asset_id, 'name' => $name, 'standard_id' => $standard_id])->first()) {
            return BuildAssetExample::create([
                'build_asset_id' => $build_asset_id, 'name' => $name,
                'standard_id' => $standard_id
            ]);
        } else {
            return response()->json(['errors' => ['name' => ['Business asset example already exists.']]], 422);
        }
    }

    public function toggle(Request $request)
    {
        $this->validate($request, [
            'example_ids' => 'required|exists:build_asset_examples,id',
            'build_asset_id' => 'required|exists:build_assets,id',
        ]);

        $build_asset_id = (int) $request->input('build_asset_id');
        $example_ids = (array) $request->input('example_ids');

        BuildAssetExample::where(['build_asset_id' => $build_asset_id, 'selected' => 1])
            ->update(['selected' => false]);

        return BuildAssetExample::
        where(['build_asset_id' => $build_asset_id])
        ->whereIn('id', $example_ids)
            ->update(['selected' => true]);
    }

    public function unselect(Request $request)
    {
        $this->validate($request, [
            'build_asset_id' => 'required|exists:build_assets,id',
        ]);

        $build_asset_id = (int) $request->input('build_asset_id');
        $example_ids = (array) $request->input('example_ids');

        return BuildAssetExample::where(['build_asset_id' => $build_asset_id, 'selected' => 1])
            ->update(['selected' => false]);
    }
}
