<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Http\Traits\DocumentsHelper;
use App\Http\Traits\TaskHelper;
use App\Models\TaskComment;
use Illuminate\Http\Request;

class CommentManager extends Controller
{
    use TaskHelper, DocumentsHelper, CompanyCommons;

    public function add(Request $request)
    {
        $this->validate($request, [
            'comment' => 'required',
            'comp_id' => 'required',
            'task_id' => 'required',
        ]);

        $comment = $request->input('comment');
        $comp_id = $request->input('comp_id');
        $task_id = $request->input('task_id');
        $parent = $request->input('parent');

        $user = $request->user();

        $comment = $user->comments()->create([
            'comment' => $comment,
            'task_id' => $task_id,
            'comp_id' => $comp_id,
            'parent' => $parent,
        ]);

        // $comments = TaskComment::with('user')->where(['task_id' => $task_id, 'comp_id' => $comp_id])->get();
        $comment = TaskComment::with('user')->find($comment->id);

        return response()->json(['comment' => $comment], 200);
    }
}
