<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\Delegation;
use App\Models\DelegationUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ControlDeligateController extends Controller
{
    /**
     * Delegate users to a control based on the provided request data.
     *
     * @param Request $request The request object containing the necessary data.
     * @throws \Exception When an error occurs during the delegation process.
     * @return \Illuminate\Http\JsonResponse Returns a JSON response indicating the success or failure of the delegation.
     */
    public function delegateUserToControl(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'comp_id' => 'required|integer|exists:companies,id',
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

        $delegated_by = $request->user()->id;

        // Begin a transaction
        DB::beginTransaction();

        try {
            // Check if an assignment exists
            $assignment = Assignment::where([
                'comp_id' => $request->comp_id,
                'domain_id' => $request->domain_id,
                'subdomain_id' => $request->subdomain_id,
                'control_id' => $request->control_id,
                'question_id' => $request->question_id
            ])->first();

            if (!$assignment) {
                return response()->json(['error' => 'Assignment not found'], 404);
            }

            // Check if a delegation already exists
            $delegation = Delegation::where([
                'assignment_id' => $assignment->assignment_id,
                'delegated_by' => $delegated_by
            ])->first();

            if (!$delegation) {
                // Create a new delegation
                $delegation = Delegation::create([
                    'assignment_id' => $assignment->assignment_id,
                    'delegated_by' => $delegated_by
                ]);
            }

            // Get the current delegated users
            $currentUserIds = $delegation->users->pluck('user_id')->toArray();

            // Determine the users to add and remove
            $newUserIds = $request->user_ids;
            $usersToAdd = array_diff($newUserIds, $currentUserIds);
            $usersToRemove = array_diff($currentUserIds, $newUserIds);

            // Remove users no longer delegated
            DelegationUser::where('delegation_id', $delegation->delegation_id)
                ->whereIn('user_id', $usersToRemove)
                ->delete();

            // Delegate each user to the control
            foreach ($usersToAdd as $user_id) {
                DelegationUser::create([
                    'delegation_id' => $delegation->delegation_id,
                    'user_id' => $user_id
                ]);
            }

            // Commit the transaction
            DB::commit();

            return response()->json([
                'message' => 'Users delegated to control successfully',
                'deligated_users' => DelegationUser::select('user_id')->where('delegation_id', $delegation->delegation_id)->get()->pluck('user_id')->toArray()
            ], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollBack();

            return response()->json(['error' => 'Failed to delegate users to control', 'details' => $e->getMessage()], 500);
        }
    }

    public function removeDelegatedUserFromControl(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'comp_id' => 'required|integer|exists:companies,id',
            'domain_id' => 'nullable|integer|exists:standard_sections,id',
            'subdomain_id' => 'nullable|integer|exists:standard_sections,id',
            'control_id' => 'nullable|integer|exists:section_controls,id',
            'question_id' => 'nullable|integer|exists:control_questions,id',
            'user_ids' => 'required|array',
            'user_ids.*' => 'integer|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $delegated_by = $request->user()->id;

        // Begin a transaction
        DB::beginTransaction();

        try {
            // Check if an assignment exists
            $assignment = Assignment::where([
                'comp_id' => $request->comp_id,
                'domain_id' => $request->domain_id,
                'subdomain_id' => $request->subdomain_id,
                'control_id' => $request->control_id,
                'question_id' => $request->question_id
            ])->first();

            if (!$assignment) {
                return response()->json(['error' => 'Assignment not found'], 404);
            }

            // Check if a delegation exists
            $delegation = Delegation::where([
                'assignment_id' => $assignment->assignment_id,
                'delegated_by' => $delegated_by
            ])->first();

            if (!$delegation) {
                return response()->json(['error' => 'Delegation not found'], 404);
            }

            // Remove users
            DelegationUser::where('delegation_id', $delegation->delegation_id)
                ->whereIn('user_id', $request->user_ids)
                ->delete();

            // Commit the transaction
            DB::commit();

            return response()->json(['message' => 'Users removed from delegation successfully'], 200);
        } catch (\Exception $e) {
            // Rollback the transaction in case of error
            DB::rollBack();

            return response()->json(['error' => 'Failed to remove users from delegation', 'details' => $e->getMessage()], 500);
        }
    }
}
