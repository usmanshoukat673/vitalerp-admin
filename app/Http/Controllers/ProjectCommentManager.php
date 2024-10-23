<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Http\Traits\DocumentsHelper;
use App\Http\Traits\TaskHelper;
use App\Models\ProjectComments;
use Illuminate\Http\Request;

class ProjectCommentManager extends Controller
{
    use TaskHelper, DocumentsHelper, CompanyCommons;

    public function list(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'project_id' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $project_id = $request->input('project_id');

        $comments = ProjectComments::with('user')
        ->where([
            'parent' => null,
            'comp_id' => $comp_id,
            'project_id' => $project_id,
        ])
        ->get();

        return response()->json(['comments' => $comments], 200);
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'comment' => 'required',
            'comp_id' => 'required',
            'project_id' => 'required',
        ]);

        $comment = $request->input('comment');
        $comp_id = $request->input('comp_id');
        $project_id = $request->input('project_id');
        $parent = $request->input('parent');

        $user = $request->user();

        $comment = $user->project_comments()->create([
            'comment' => $comment,
            'project_id' => $project_id,
            'comp_id' => $comp_id,
            'parent' => $parent,
        ]);

        $comment = ProjectComments::with('user')->find($comment->id);

        return response()->json(['comment' => $comment], 200);
    }
}
