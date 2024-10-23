<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Models\BuildSuppliers;
use App\Models\BuildSuppliersExamples;
use Illuminate\Http\Request;
use Illuminate\Contracts\Encryption\DecryptException;

class BuildSuppliersController extends Controller
{
    public function suppliers($build_id, $standard_id)
    {
        if ($build_id == null || !$build_id || $standard_id == null || !$standard_id) {
            abort(404);
        }

        try {

            $build_id = decrypt($build_id);
            return BuildSuppliers::where(
                ['standard_id' => $standard_id, 'build_id' => $build_id])
            ->with(['examples' => function($supp_query) {
                return $supp_query->select('id', 'name', 'selected', 'build_supplier_id');
            }])->get();
           
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }

    public function select(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:build_suppliers,id',
            'included' => 'required'
        ]);

        $id = $request->input('id');
        $included = $request->input('included');

        BuildSuppliers::where(['id' => $id])->update(['included' => $included, 'responded' => 1]);
        return true;
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'name' => 'required',
            'standard_id' => 'required',
        ]);

        $name = (string) $request->input('name');
        $build_id = (string) $request->input('build_id');
        $standard_id = (int) $request->input('standard_id');

        try {
            $build_id = decrypt($build_id);

            if (!BuildSuppliers::where([
                'build_id' => $build_id, 
                'name' => $name, 
                'standard_id' => $standard_id])->first()) {
                $asset = BuildSuppliers::create([
                    'build_id' => $build_id, 'name' => $name, 
                    'included' => 1, 
                    'custom' => 1,
                    'standard_id' => $standard_id
                ]);

                return BuildSuppliers::with(['examples' => function($asset_query) {
                    return $asset_query->select('id', 'name', 'selected', 'build_supplier_id');
                }])->find($asset->id);
                
            } else {
                return response()->json(['errors' => ['name' => ['Supplier already exists.']]], 422);
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

        if (!BuildSuppliers::where(['name' => $name])->where('id', '!=', $id)->first()) {
            return BuildSuppliers::where(['id' => $id])->update([
                'name' => $name
            ]);
        } else {
            return response()->json(['errors' => ['name' => ['Supplier already exists.']]], 422);
        }
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'id' => 'required',
        ]);

        $id = (int) $request->input('id');

        if (BuildSuppliers::where(['id' => $id])->delete()) {

            BuildSuppliersExamples::where(['build_supplier_id' => $id])->delete();

            return true;
        } else {
            return response()->json(['errors' => ['name' => ['Supplier does not exists.']]], 422);
        }
    }
}
