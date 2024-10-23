<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Http\Traits\DocumentsHelper;
use App\Http\Traits\TaskHelper;
use App\Models\ControlComment;
use Illuminate\Http\Request;

class ControlCommentController extends Controller
{
    use DocumentsHelper, CompanyCommons;

    public function add(Request $request)
    {
        $this->validate($request, [
            'comment' => 'required',
            'comp_id' => 'required',
            'control_id' => 'required',
        ]);

        $comment = $request->input('comment');
        $comp_id = $request->input('comp_id');
        $control_id = $request->input('control_id');
        $parent = $request->input('parent');

        $user = $request->user();

        $comment = $user->control_comments()->create([
            'comment' => $comment,
            'control_id' => $control_id,
            'comp_id' => $comp_id,
            'parent' => $parent,
        ]);

        $comment = ControlComment::with('user')->find($comment->id);

        return response()->json(['comment' => $comment], 200);
    }

    public function list(Request $request){

        $this->validate($request, [
            'comp_id' => 'required',
            'control_id' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $control_id = $request->input('control_id');

        return ControlComment::with('user')
        ->where([
            'parent' => null,
            'comp_id' => $comp_id,
            'control_id' => $control_id,
        ])
        ->get();
    }
}
