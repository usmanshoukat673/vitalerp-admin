<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Integration;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    protected $filter_categories = [];

    public function appCount(Request $request)
    {
        $this->validate($request, ['id' => 'required']);

        $category_id = $request->input('id');

        $this->filter_categories = [];
        $category = Category::find($category_id);
        array_push($this->filter_categories, $category->id);
        if (count($category->childs) > 0) {
            $this->getAllCategories($category->childs);
        }

        $apps = Integration::select('integrations.id')
            ->leftJoin('inte_categories', 'integrations.id', '=', 'inte_categories.int_id')
            ->whereIn('inte_categories.cat_id', $this->filter_categories)
            ->where(['integrations.active' => 1])
            ->distinct('integrations.id')
            ->count();

        if (request()->wantsJson()) {
            return response()->json(['apps' => $apps], 200);
        }

        return $apps;
    }

    protected function getAllCategories($childs)
    {
        if (count($childs) > 0) {
            foreach ($childs as $cat) {
                array_push($this->filter_categories, $cat->id);
                if (count($cat->childs) > 0) {
                    $this->getAllCategories($cat->childs);
                }
            }
        }
    }
}
