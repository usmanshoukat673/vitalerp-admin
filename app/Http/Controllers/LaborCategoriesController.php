<?php

namespace App\Http\Controllers;

use App\Models\LaborCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class LaborCategoriesController extends Controller
{

    public function all(Request $request, $order)
    {
        return LaborCategory::where(['comp_id' => $request->comp_id])->orderBy('name', $order)->get();
    }
    /**
     * Get paginated list of labor categories with optional search.
     *
     * @queryParam search string Search by name, naics_code, pcs_code or description.
     * @queryParam comp_id int Required. The company id.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = LaborCategory::query();
        $perPage = $request->query('per_page', 25);

        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('naics_code', 'like', "%{$search}%")
                    ->orWhere('pcs_code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $query->with(['naicsCode' => function ($q) {
            $q->select('id', 'naics_code', 'naics_industry_description');
        }]);

        $query->where(['comp_id' => $request->comp_id]);

        $query->orderBy('name', 'asc');

        $laborCategories = $query->paginate($perPage);
        return response()->json($laborCategories, 200);
    }

    /**
     * Store a newly created labor category in storage.
     *
     * @bodyParam name string required The name of the labor category.
     * @bodyParam naics_code int required The naics_code of the labor category.
     * @bodyParam pcs_code string required The pcs_code of the labor category.
     * @bodyParam description string nullable The description of the labor category.
     * @bodyParam comp_id int required The company id of the labor category.
     * @response 201 {
     *  "naics_code": {
     *      "id": 1,
     *      "name": "Labor Category Name",
     *      "naics_code": "naics_code",
     *      "pcs_code": "pcs_code",
     *      "description": "description",
     *      "created_at": "2022-01-01 00:00:00",
     *      "updated_at": "2022-01-01 00:00:00",
     *      "created_by": 1,
     *      "naics_code": {
     *          "id": 1,
     *          "naics_code": "naics_code",
     *          "naics_industry_description": "naics_industry_description"
     *      }
     *  },
     *  "message": "labor category created successfully."
     * }
     * @response 422 {
     *  "errors": {
     *      "name": [
     *          "The name field is required.",
     *          "The name must be a string.",
     *          "The name must not be greater than 255 characters."
     *      ],
     *      "naics_code": [
     *          "The naics code field is required.",
     *          "The naics code must exist in the naics codes table."
     *      ],
     *      "pcs_code": [
     *          "The pcs code field is required.",
     *          "The pcs code must be a string.",
     *          "The pcs code must not be greater than 255 characters."
     *      ],
     *      "description": [
     *          "The description may not be greater than 255 characters."
     *      ]
     *  }
     * }
     * @response 500 {
     *  "error": "Failed to create labor category."
     * }
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255|unique:labor_categories,name,null,id,comp_id,' . $request->comp_id,
            'naics_code' => 'required|exists:naics_codes,id',
            'pcs_code' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
        ], [
            'name.required' => 'The Name field is required.',
            'name.unique' => 'The Name has already been taken.',
            'naics_code.required' => 'The NAICS Code field is required',
            'pcs_code.required' => 'The PSC Code field is required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            $laborCategory = LaborCategory::create([
                'name' => $request->name,
                'naics_code' => $request->naics_code,
                'pcs_code' => $request->pcs_code,
                'description' => $request->description,
                'comp_id' => $request->comp_id,
                'created_by' => $request->user()->id,
            ]);

            DB::commit();

            return response()->json(['naics_code' => $laborCategory, 'message' => 'labor category created successfully.'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to create labor category.'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @bodyParam name string The name of the labor category.
     * @bodyParam naics_code int The naics_code of the labor category.
     * @bodyParam pcs_code string The pcs_code of the labor category.
     * @bodyParam description string The description of the labor category.
     *
     * @response 200 {
     *  "naics_code": {
     *      "id": 1,
     *      "name": "Labor Category Name",
     *      "naics_code": "naics_code",
     *      "pcs_code": "pcs_code",
     *      "description": "description",
     *      "created_at": "2022-01-01 00:00:00",
     *      "updated_at": "2022-01-01 00:00:00",
     *      "created_by": 1,
     *      "naics_code": {
     *          "id": 1,
     *          "naics_code": "naics_code",
     *          "naics_industry_description": "naics_industry_description"
     *      }
     *  },
     *  "message": "labor category updated successfully."
     * }
     * @response 422 {
     *  "errors": {
     *      "name": [
     *          "The name field is required.",
     *          "The name must be a string.",
     *          "The name must not be greater than 255 characters."
     *      ],
     *      "naics_code": [
     *          "The naics code field is required.",
     *          "The naics code must exist in the naics codes table."
     *      ],
     *      "pcs_code": [
     *          "The pcs code field is required.",
     *          "The pcs code must be a string.",
     *          "The pcs code must not be greater than 255 characters."
     *      ],
     *      "description": [
     *          "The description may not be greater than 255 characters."
     *      ]
     *  }
     * }
     * @response 500 {
     *  "error": "Failed to update labor category."
     * }
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255|unique:labor_categories,name,' . $id . ',id,comp_id,' . $request->comp_id,
            'naics_code' => 'sometimes|required|exists:naics_codes,id',
            'pcs_code' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|nullable|string|max:255',
        ], [
            'name.required' => 'The Name field is required.',
            'name.unique' => 'The Name has already been taken.',
            'naics_code.required' => 'The NAICS Code field is required',
            'pcs_code.required' => 'The PSC Code field is required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        DB::beginTransaction();

        try {
            $laborCategory = LaborCategory::findOrFail($id);

            $laborCategory->update($request->only(['name', 'naics_code', 'pcs_code', 'description'] + ['updated_by' => $request->user()->id]));

            DB::commit();

            return response()->json(['naics_code' => $laborCategory, 'message' => 'labor category updated successfully.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update labor category.'], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function destroy($id)
    {
        DB::beginTransaction();

        try {
            $laborCategory = LaborCategory::findOrFail($id);
            $laborCategory->delete();

            DB::commit();

            return response()->json(['message' => 'labor category deleted successfully.'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to delete labor category.'], 500);
        }
    }

    
    /**
     * Get list of labor categories by IDs.
     * 
     * @queryParam labor_category_ids array required The IDs of the labor categories.
     * 
     * @return \Illuminate\Http\Response
     */
    public function getLaborCategories(Request $request)
    {
        $laborCategories = LaborCategory::
        select(['id', 'name', 'naics_code', 'pcs_code'])
        ->whereIn('id', $request->labor_category_ids)->get();
        return response()->json(['labor_categories' => $laborCategories], 200);
    }
}
