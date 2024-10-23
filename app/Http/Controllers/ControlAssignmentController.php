<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\AssignmentUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ControlAssignmentController extends Controller
{
    /**
     * Assign users to a control based on the provided request data.
     *
     * @param Request $request The request object containing the necessary data.
     * @throws \Exception When an error occurs during the assignment process.
     * @return \Illuminate\Http\JsonResponse Returns a JSON response indicating the success or failure of the assignment.
     */
    public function assignUserToControl(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'domain_id' => 'nullable|integer|exists:standard_sections,id',
            'subdomain_id' => 'nullable|integer|exists:standard_sections,id',
            'control_id' => 'nullable|integer|exists:section_controls,id',
            'question_id' => 'nullable|integer|exists:control_questions,id',
            'user_ids' => 'required|array',
            'user_ids.*' => 'integer|exists:users,id'
        ], ["user_ids.required" => 'Please select at least one user']);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $assigned_by = $request->user()->id;

        // Begin a transaction
        DB::beginTransaction();

        try {

            // Check if an assignment already exists
            $assignment = Assignment::where([
                'comp_id' => $request->comp_id,
                'domain_id' => $request->domain_id,
                'subdomain_id' => $request->subdomain_id,
                'control_id' => $request->control_id,
                'question_id' => $request->question_id
            ])->first();

            if (!$assignment) {
                // Create a new assignment
                $assignment = Assignment::create([
                    'comp_id' => $request->comp_id,
                    'domain_id' => $request->domain_id,
                    'subdomain_id' => $request->subdomain_id,
                    'control_id' => $request->control_id,
                    'question_id' => $request->question_id,
                    'assigned_by' => $assigned_by
                ]);
            }

            // Get the current assigned users
            $currentUserIds = $assignment->users->pluck('user_id')->toArray();

            // Determine the users to add and remove
            $newUserIds = $request->user_ids;
            $usersToAdd = array_diff($newUserIds, $currentUserIds);
            $usersToRemove = array_diff($currentUserIds, $newUserIds);

            // Remove users no longer assigned
            AssignmentUser::where('assignment_id', $assignment->assignment_id)
                ->whereIn('user_id', $usersToRemove)
                ->delete();

            // Assign each user to the control
            foreach ($usersToAdd as $user_id) {
                AssignmentUser::create([
                    'assignment_id' => $assignment->assignment_id,
                    'user_id' => $user_id
                ]);
            }

            // Commit the transaction
            DB::commit();

            return response()->json([
                'message' => "Users assigned to control successfully",
                'assigned_users' => AssignmentUser::select('user_id')->where('assignment_id', $assignment->assignment_id)->get()->pluck('user_id')->toArray()
            ], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollBack();

            return response()->json(['error' => 'Failed to assign users to control', 'details' => $e->getMessage()], 500);
        }
    }
}
