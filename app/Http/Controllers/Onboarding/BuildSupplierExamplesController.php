<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Models\BuildSuppliersExamples;
use Illuminate\Http\Request;

class BuildSupplierExamplesController extends Controller
{
    public function add(Request $request)
    {
        $this->validate($request, [
            'build_supplier_id' => 'required|exists:build_suppliers,id',
            'name' => 'required',
            'standard_id' => 'required',
        ]);

        $name = (string) $request->input('name');
        $build_supplier_id = (int) $request->input('build_supplier_id');
        $standard_id = (int) $request->input('standard_id');

        if (!BuildSuppliersExamples::where(['build_supplier_id' => $build_supplier_id, 'name' => $name, 'standard_id' => $standard_id])->first()) {
            return BuildSuppliersExamples::create([
                'build_supplier_id' => $build_supplier_id, 'name' => $name,
                'standard_id' => $standard_id
            ]);
        } else {
            return response()->json(['errors' => ['name' => ['Supplier example already exists.']]], 422);
        }
    }

    public function toggle(Request $request)
    {
        $this->validate($request, [
            'example_ids' => 'required|exists:build_asset_examples,id',
            'build_supplier_id' => 'required|exists:build_suppliers,id',
        ]);

        $build_supplier_id = (int) $request->input('build_supplier_id');
        $example_ids = (array) $request->input('example_ids');

        BuildSuppliersExamples::where(['build_supplier_id' => $build_supplier_id, 'selected' => 1])
            ->update(['selected' => false]);

        return BuildSuppliersExamples::
        where(['build_supplier_id' => $build_supplier_id])
        ->whereIn('id', $example_ids)
            ->update(['selected' => true]);
    }

    public function unselect(Request $request)
    {
        $this->validate($request, [
            'build_supplier_id' => 'required|exists:build_suppliers,id',
        ]);

        $build_supplier_id = (int) $request->input('build_supplier_id');
        $example_ids = (array) $request->input('example_ids');

        return BuildSuppliersExamples::where(['build_supplier_id' => $build_supplier_id, 'selected' => 1])
            ->update(['selected' => false]);
    }
}
