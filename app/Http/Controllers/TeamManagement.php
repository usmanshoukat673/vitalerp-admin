<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Notifications\TeamMemberLeft;
use App\Notifications\TeamNewUserJoined;
use App\Models\Team;
use App\Models\TeamUser;
use App\Models\User;
use App\Models\UserCompanies;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

class TeamManagement extends Controller
{
    use CompanyCommons;

    /**
     * list teams from the given company
     *
     * @param [type] $comp_id
     * @return void
     */
    public function list($comp_id)
    {

        if (!$comp_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();


        $teams = Team::with(['owner', 'manager'])->where(['comp_id' => $comp_id])->paginate(10);

        if (request()->wantsJson()) {
            return response()->json(['teams' => $teams], 200);
        }

        return $teams;
    }

    public function allTeams($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();


        $teams = Team::select('id', 'name')->where(['comp_id' => $comp_id])
            ->orderBy('name', 'asc')
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['teams' => $teams], 200);
        }

        return $teams;
    }

    public function companyUsers($comp_id)
    {
        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        // $user = request()->user();

        if (request()->wantsJson()) {
            return response()->json(['users' => $this->listAllUsers($comp_id)], 200);
        }

        return $this->listAllUsers($comp_id);
    }

    public function createTeam(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'name' => 'required|max:255',
        ]);

        if ($this->hasNameTaken($request)) {
            return response()->json(['errors' => [['name' => 'Team with the given name already exists!']]], 422);
        }

        $user = request()->user();

        $team = Team::create(['name' => $request->input('name'), 'comp_id' => $request->input('comp_id'), 'created_by' => $user->id]);

        if (request()->wantsJson()) {
            return response()->json(['team' => $team], 200);
        }

        return $team;
    }

    public function hasNameTaken($request)
    {
        return  Team::where(['name' => $request->input('name'), 'comp_id' => $request->input('comp_id')])->first();
    }

    /**
     * Update Team
     *
     * @param Request $request
     * @return App\Model\Team
     */
    public function editTeam(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'team_id' => 'required|exists:teams,id',
            'name' => 'required|max:255',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $team_id = $request->input('team_id');
        $name = $request->input('name');
        $managed_by = $request->input('managed_by');

        $team = Team::find($team_id);

        // make sure you are admin or the team is created by you
        if (UserCompanies::where(['user_id' => $user->id, 'comp_id' => $comp_id, 'role' => 'A'])->first() || $team->created_by === $user->id) {
            if ($this->hasNameTakenOnEdit($request)) {
                return response()->json(['errors' => [['name' => 'Team with the given name already exists!']]], 422);
            }

            $team->name = $name;
            $team->managed_by = $managed_by;
            $team->updated_by = $user->id;
            $team->save();

            $team = Team::with(['owner', 'manager'])->find($team_id);

            if (request()->wantsJson()) {
                return response()->json(['team' => $team], 200);
            }
        } else {
            return response()->json(['message' => 'You are not allowed to make changes to the team!'], 403); # 403 Forbidden
        }
    }

    public function hasNameTakenOnEdit($request)
    {
        return  Team::where(['name' => $request->input('name'), 'comp_id' => $request->input('comp_id')])
            ->where('id', '!=', $request->input('team_id'))
            ->first();
    }

    /**
     * Delete Team
     *
     * @param Request $request
     * @return void
     */
    public function removeTeam(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'team_id' => 'required|exists:teams,id',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $team_id = $request->input('team_id');

        $team = Team::find($team_id);

        if (UserCompanies::where(['user_id' => $user->id, 'comp_id' => $comp_id, 'role' => 'A'])->first() || $team->created_by === $user->id) {

            TeamUser::where([
                'team_id' => $request->input('team_id')
            ])->delete();

            $team->delete();

            return response()->json(['message' => 'Given Team has been removed'], 200);
        } else {
            return response()->json(['message' => 'You are not allowed to remove team!'], 403); # 403 Forbidden
        }
    }

    public function profile($comp_id, $team_id)
    {
        if (!$comp_id || !$team_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $team_id = decrypt($team_id);

        $team = Team::with(['owner', 'users.user', 'users.assignee', 'manager'])->find($team_id);

        if (request()->wantsJson()) {
            return response()->json(['team' => $team], 200);
        }

        return $team;
    }

    public function getUsersToAssign($comp_id, $team_id)
    {
        if (!$comp_id || !$team_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $users = UserCompanies::where(['comp_id' => $comp_id])->get();

        $team_id = decrypt($team_id);

        $team_users = TeamUser::select('user_id')->where(['team_id' => $team_id])->get();

        $existings_users = [];

        if (count($team_users) > 0) {
            foreach ($team_users as $user) {
                array_push($existings_users, $user->user_id);
            }
        }

        $users = $users->whereNotIn('user_id', $existings_users);

        if (request()->wantsJson()) {
            return response()->json(['users' => $users], 200);
        }

        return $users;
    }

    public function assignUser(Request $request)
    {
        $this->validate($request, [
            'team_id' => 'required|exists:teams,id',
            'user_id' => 'required|exists:users,id',
        ]);

        if (TeamUser::where(['user_id' => $request->input('user_id'), 'team_id' => $request->input('team_id')])->first()) {
            if (request()->wantsJson()) {
                return response()->json(['error_message' => 'User already exists in the team!'], 422);
            }
        }

        // send notifications to existing team users
        $users = User::rightJoin('team_users', 'users.id', '=', 'team_users.user_id')
            ->select('users.*')
            ->where(['team_users.team_id' => $request->input('team_id')])
            ->get();

        if (count($users) > 0) {
            $this->sendJoinedNotification($users, $request);
        }

        $user = TeamUser::create([
            'user_id' => $request->input('user_id'),
            'team_id' => $request->input('team_id'),
            'assigned_by' => $request->user()->id
        ]);

        $user = TeamUser::with(['user', 'assignee'])->where(['user_id' => $user->user_id, 'team_id' => $user->team_id])->first();

        if (request()->wantsJson()) {
            return response()->json(['user' => $user], 200);
        }

        return true;
    }

    public function sendJoinedNotification($users, $request)
    {
        $team = Team::find($request->input('team_id'));
        $user = User::find($request->input('user_id'));
        $date = new Carbon();

        $data['joined_at'] = $date->now()->toDateTimeLocalString();
        Notification::send($users, new TeamNewUserJoined($team, $user, $data));
    }

    public function removeUser(Request $request)
    {
        $this->validate($request, [
            'team_id' => 'required|exists:teams,id',
            'user_id' => 'required|exists:users,id',
        ]);

        TeamUser::where([
            'user_id' => $request->input('user_id'),
            'team_id' => $request->input('team_id')
        ])->delete();

        // send notifications to remaning team users
        $users = User::rightJoin('team_users', 'users.id', '=', 'team_users.user_id')
            ->select('users.*')
            ->where(['team_users.team_id' => $request->input('team_id')])
            ->get();

        if (count($users) > 0) {
            $this->sendLeftNotification($users, $request);
        }

        if (request()->wantsJson()) {
            return response()->json(['message' => 'deleted'], 200);
        }

        return true;
    }

    public function sendLeftNotification($users, $request)
    {
        $team = Team::find($request->input('team_id'));
        $user = User::find($request->input('user_id'));
        $date = new Carbon();

        $data['left_at'] = $date->now()->toDateTimeLocalString();
        Notification::send($users, new TeamMemberLeft($team, $user, $data));
    }
}
