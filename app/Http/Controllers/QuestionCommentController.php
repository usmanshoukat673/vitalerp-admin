<?php

namespace App\Http\Controllers;

use App\Models\QuestionComment;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionCommentController extends Controller
{
    /**
     * Fetch comments for the given company_control_question_id
     *
     * @param datatype $companyControlQuestionId description
     * @throws Some_Exception_Class description of exception
     * @return Some_Return_Value
     */
    public function listCommentsWithReplies($companyControlQuestionId)
    {
        // Fetch comments for the given company_control_question_id
        return response()->json(['comments' => $this->getComments($companyControlQuestionId)]);
    }

    /**
     * Add a comment to a question.
     *
     * @param Request $request The HTTP request object.
     * @throws \Illuminate\Validation\ValidationException If the validation fails.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the success message and the added comment.
     */
    public function addComment(Request $request)
    {
        $this->validate($request, [
            'company_control_question_id' => 'required|integer|exists:company_control_questions,id',
            'comp_id' => 'required|integer|exists:companies,id',
            'comment' => 'required|string'
        ]);

        DB::beginTransaction();

        try {
            $comment = QuestionComment::create([
                'company_control_question_id' => $request->company_control_question_id,
                'comp_id' => $request->comp_id,
                'comment' => $request->comment,
                'commented_by' => $request->user()->id,
                'date_commented' => now(),
                'parent_id' => $request->parent_id
            ]);

            DB::commit();

            $comment = QuestionComment::with('replies', 'commentedBy')->find($comment->id);

            return response()->json(['message' => 'Comment added successfully', 'comment' => $comment], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to add comment.', 'details' => $e->getMessage()], 500);
        }
    }


    /**
     * Update a comment based on the provided request data.
     *
     * @param Request $request The HTTP request object.
     * @throws \Throwable If an error occurs during the update process.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the update status and comment.
     */
    public function updateComment(Request $request)
    {
        $this->validate($request, [
            'comment' => 'required|string',
            'comment_id' => 'required|integer|exists:question_comments,id',
        ]);

        DB::beginTransaction();

        try {
            $comment = QuestionComment::find($request->comment_id);

            $comment->update([
                'comment' => $request->comment,
                'commented_by' => $request->user()->id,
                'date_commented' => now()
            ]);

            DB::commit();

            $comment = QuestionComment::with('replies', 'commentedBy')->find($comment->id);

            return response()->json(['message' => 'Comment updated successfully', 'comment' => $comment], 200);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to update comment.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Reply to a comment.
     *
     * @param Request $request The HTTP request object.
     * @throws \Illuminate\Validation\ValidationException If the validation fails.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the success message and the replied comment.
     */
    public function replyToComment(Request $request)
    {
        $this->validate($request, [
            'parent_id' => 'required|integer|exists:question_comments,id',
            'company_control_question_id' => 'required|integer|exists:company_control_questions,id',
            'comp_id' => 'required|integer|exists:companies,id',
            'comment' => 'required|string'
        ]);

        // Begin a transaction
        DB::beginTransaction();

        try {
            $comment = QuestionComment::create([
                'parent_id' => $request->parent_id,
                'company_control_question_id' => $request->company_control_question_id,
                'comp_id' => $request->comp_id,
                'comment' => $request->comment,
                'commented_by' => $request->user()->id,
                'date_commented' => now()
            ]);

            // Commit the transaction
            DB::commit();

            $comment = QuestionComment::with('replies', 'commentedBy')->find($comment->id);

            return response()->json(['message' => 'Reply added successfully', 'comment' => $comment], 201);
        } catch (\Throwable $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to Reply comment.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Deletes a comment and performs a cascading soft delete.
     *
     * @param int $companyControlQuestionId The ID of the company control question.
     * @param int $commentId The ID of the comment to be deleted.
     * @throws \Exception If an error occurs during the deletion process.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the success message and the updated comments.
     */
    public function deleteComment($companyControlQuestionId, $commentId)
    {
        // Begin a transaction
        DB::beginTransaction();

        try {
            // Find the comment
            $comment = QuestionComment::find($commentId);

            if (!$comment) {
                return response()->json(['error' => 'Comment not found'], 404);
            }

            // Perform the cascading soft delete
            $this->cascadeSoftDelete($comment);

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Comment deleted successfully', 'comments' => $this->getComments($companyControlQuestionId)]);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollBack();

            return response()->json(['error' => 'Failed to delete comment.', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Recursively delete replies
     */
    private function cascadeSoftDelete($comment)
    {
        // Recursively delete replies
        foreach ($comment->replies as $reply) {
            $this->cascadeSoftDelete($reply);
        }

        // Soft delete the comment
        $comment->delete();
    }


    private function getComments($companyControlQuestionId)
    {
        return QuestionComment::where('company_control_question_id', $companyControlQuestionId)
            ->whereNull('parent_id')
            ->with('replies', 'commentedBy')
            ->orderBy('date_commented', 'asc')
            ->get();
    }
}
