<?php

namespace App\Http\Controllers;

use App\Models\ReteCategories;
use App\Models\RetePredefinedWorkflows;
use Illuminate\Http\Request;

class ReteMarketplaceController extends Controller
{

    protected $filter_categories = [];

    public function list()
    {
        $categories = ReteCategories::orderBy('name', 'asc')->where(['active' => 1])->get();

        if (request()->wantsJson()) {
            return response()->json(['categories' => $categories], 200);
        }

        return $categories;
    }

    public function workflows(Request $request)
    {
        // TODO: have featured apps showing all the time at the top

        if ($request->get('category')) {
            $this->filter_categories = explode(',', $request->get('category'));

            if ($request->get('search')) {
                $search = strtolower(trim($request->get('search')));

                $workflows = RetePredefinedWorkflows::
                select('id', 'name', 'rete_defined_workflows.created_at', 'totalViews', 'nodes', 'recentViews')
                ->leftJoin('rete_workflow_categories', 'rete_defined_workflows.id', '=', 'rete_workflow_categories.workflow_id')
                    ->whereIn('rete_workflow_categories.category_id', $this->filter_categories)
                    ->where('rete_defined_workflows.name', 'LIKE', "%{$search}%")
                    ->distinct('rete_defined_workflows.id')
                    ->orderBy('recentViews', 'desc')
                    ->paginate(10);


            } else {

                $workflows = RetePredefinedWorkflows::
                select('id', 'name', 'rete_defined_workflows.created_at', 'totalViews', 'nodes', 'recentViews')
                ->leftJoin('rete_workflow_categories', 'rete_defined_workflows.id', '=', 'rete_workflow_categories.workflow_id')
                    ->whereIn('rete_workflow_categories.category_id', $this->filter_categories)
                    ->distinct('rete_defined_workflows.id')
                    ->orderBy('recentViews', 'desc')
                    ->paginate(10);
            }
        } else if ($request->get('search') && !$request->get('category')) {
            $search = strtolower(trim($request->get('search')));

            $workflows = RetePredefinedWorkflows::select('id', 'name', 'created_at', 'totalViews', 'nodes', 'recentViews')
            ->where('rete_defined_workflows.name', 'LIKE', "%{$search}%")
            ->orderBy('recentViews', 'desc')
            ->paginate(10);

        } else {
            $workflows = RetePredefinedWorkflows::select('id', 'name', 'created_at', 'totalViews', 'nodes', 'recentViews')
            ->orderBy('recentViews', 'desc')
            ->paginate(10);
        }


        if (request()->wantsJson()) {
            return response()->json(['workflows' => $workflows], 200);
        }

        return $workflows;
    }

    public function workflow(Request $request)
    {
        $this->validate($request, [
            'id' => 'required'
        ]);

        $id = $request->input('id');

        $workflow = RetePredefinedWorkflows::find($id);

        if (request()->wantsJson()) {
            return response()->json(['workflow' => $workflow], 200);
        }

        return $workflow;
    }

}
