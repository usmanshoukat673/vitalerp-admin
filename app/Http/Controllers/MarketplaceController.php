<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Integration;
use Illuminate\Http\Request;

class MarketplaceController extends Controller
{
    protected $filter_categories = [];

    public function list()
    {

        $all_categories = Category::orderBy('name', 'asc')->where(['active' => 1])->get();

        $categories = Category::where(['parent' => null])->where(['active' => 1])->orderBy('name', 'asc')->get();

        if (request()->wantsJson()) {
            return response()->json(['categories' => $categories, 'all_categories' => $all_categories], 200);
        }

        return $categories;
    }

    public function getAllCategories($childs)
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

    public function apps(Request $request)
    {
        // TODO: have featured apps showing all the time at the top

        if ($request->get('category')) {
            $category = $request->get('category');
            $this->filter_categories = [];
            $category = Category::find($category);
            array_push($this->filter_categories, $category->id);
            if (count($category->childs) > 0) {
                $this->getAllCategories($category->childs);
            }

            if ($request->get('search')) {
                $search = strtolower(trim($request->get('search')));

                $apps = Integration::with('categories.category')
                    ->select('integrations.id', 'integrations.name', 'integrations.description', 'integrations.logo', 'integrations.service_phone', 'integrations.web_address')
                    ->leftJoin('inte_categories', 'integrations.id', '=', 'inte_categories.int_id')
                    ->whereIn('inte_categories.cat_id', $this->filter_categories)
                    ->where('integrations.name', 'LIKE', "%{$search}%")
                    ->where(['integrations.active' => 1])
                    ->distinct('integrations.id')
                    ->paginate(5);
            } else {

                $apps = Integration::with('categories.category')
                    ->select('integrations.id', 'integrations.name', 'integrations.description', 'integrations.logo', 'integrations.service_phone', 'integrations.web_address')
                    ->leftJoin('inte_categories', 'integrations.id', '=', 'inte_categories.int_id')
                    ->whereIn('inte_categories.cat_id', $this->filter_categories)
                    ->where(['integrations.active' => 1])
                    ->distinct('integrations.id')
                    ->paginate(5);
            }
        } else if ($request->get('search') && !$request->get('category')) {
            $search = strtolower(trim($request->get('search')));
            $apps = Integration::with('categories.category')->where('integrations.name', 'LIKE', "%{$search}%")->where(['integrations.active' => 1])->paginate(5);
        } else {
            $apps = Integration::with('categories.category')->where(['integrations.active' => 1])->paginate(5);
        }


        if (request()->wantsJson()) {
            return response()->json(['apps' => $apps], 200);
        }

        return $apps;
    }
}
