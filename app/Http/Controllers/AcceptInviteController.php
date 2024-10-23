<?php

namespace App\Http\Controllers;

use App\Models\TeamUser;
use App\Models\UserAssigns;
use App\Models\UserCompanies;
use App\Models\UserLocation;
use App\Models\UserLocationAssigns;
use App\Models\UserTeamAssigns;
use Illuminate\Http\Request;

class AcceptInviteController extends Controller
{
    use DeviceHandler;

    public function accept(Request $request)
    {
        $this->validate($request, [
            '_token' => 'required',
            'email' => 'required'
        ]);

        $user = $request->user();

        $invite = UserAssigns::where(['email' => decrypt($request->input('email')), 'remember_token' => $request->input('_token')])->first();

        if (!$invite) {
            return response()->json(['errors' => ['email' => ['This user already been assigned or invalid link']]], 400);
        }

        if (strtolower($invite->email) !== strtolower($user->email)) {
            return response()->json(['errors' => ['email' => ['Invalid active user.']]], 400);
        }

        UserCompanies::create(['user_id' => $user->id, 'comp_id' => $invite->assigned_to, 'role' => $invite->role, 'assigned_by' => $invite->assigned_by]);
        $invite->remember_token = null;
        $invite->status = 1;
        $invite->save();

        $teams = UserTeamAssigns::where(['user_assign_id' => $invite->id])->get();

        if (count($teams) > 0) {
            foreach ($teams as $teamAssign) {
                TeamUser::create(['user_id' => $user->id, 'team_id' => $teamAssign->team_id, 'assigned_by' => $invite->assigned_by]);
            }
        }

        // Assign locations if any
        $locations = UserLocationAssigns::where(['user_assign_id' => $invite->id])->get();

        if (count($locations) > 0) {
            foreach ($locations as $locAssign) {
                UserLocation::create(['user_id' => $user->id, 'location_id' => $locAssign->location_id, 'assigned_by' => $invite->assigned_by, 'comp_id' => $invite->assigned_to]);
            }
        }

        $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        $new_device = $this->identifyAsset($request);

        if ($request->wantsJson()) {
            return response()->json(['message' => 'Successfully accepted the invitation', 'companies' => $companies, 'new_device' => $new_device], 200);
        }

        return true;
    }
}
