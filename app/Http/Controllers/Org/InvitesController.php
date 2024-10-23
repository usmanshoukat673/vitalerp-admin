<?php

namespace App\Http\Controllers\Org;

use App\Http\Controllers\Controller;
use App\Mail\NewUserInvite;
use App\Mail\WatchInvitation;
use App\Models\User;
use App\Models\UserAssigns;
use App\Models\UserCompanies;
use App\Models\UserLocationAssigns;
use App\Models\UserTeamAssigns;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class InvitesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function invite(Request $request)
    {
        $this->validate($request, ['email' => ['required', 'string', 'email', 'max:255'], 'role' => 'required', 'company' => 'required']);
        $user = $request->user();

        if ($user->email == $request->input('email')) {
            return response()->json(['errors' => ['email' => ['You can not invite your-self']]], 400);
        }

        if ($this->alreadyInvited($request, $user)) {
            return response()->json(['errors' => ['email' => ['This user already been invited to the organization.']]], 400);
        }

        $invite = $this->storeInvite($user, $request);

        if ($invited_user = $this->emailExists($request)) {
            // send notification to existing user - which needs to store on database as well
            // existing user has to login first and then get back to the screen were we can assign users and redirect to the org page
            $invited_user->sendOrgInvitationNotification(['org' => $request->input('company'), 'inviter' => $user, 'user' => $invited_user, 'invite' => $invite]);
        } else {
            // send notification to new user
            $message = (new NewUserInvite(['org' => $request->input('company'), 'inviter' => $user, 'invite' => $invite]))->onQueue(config('motion.DEFAULT_QUEUE'));
            Mail::to($request->input('email'))->queue($message);
        }
    }

    protected function emailExists($request)
    {
        return User::where(['email' => $request->input('email')])->first();
    }

    protected function alreadyInvited($request, $user)
    {
        return (UserAssigns::where(['email' => $request->input('email'), 'assigned_by' => $user->id, 'assigned_to' => $request->input('company')['id']])->first() ? true : false);
    }

    protected function storeInvite($user, $request)
    {
        $assign = UserAssigns::create(
            [
                'assigned_by' => $user->id,
                'assigned_to' => $request->input('company')['id'],
                'email' => $request->input('email'),
                'role' => $request->input('role'),
                'remember_token' =>  \Str::random(60)
            ]
        );

        $teams = $request->input('selected_teams');

        if (count($teams) > 0) {
            foreach ($teams as $team_id) {
                UserTeamAssigns::create(['user_assign_id' => $assign->id, 'team_id' => $team_id]);
            }
        }

        // store locations for the teams
        $locations = $request->input('locations');

        if (count($locations) > 0) {
            foreach ($locations as $location_id) {
                UserLocationAssigns::create(['user_assign_id' => $assign->id, 'location_id' => $location_id]);
            }
        }

        return $assign;
    }

    public function watchInvite(Request $request)
    {
        $this->validate($request, [
            'user_id' => 'required|exists:users,id',
            'comp_id' => 'required|exists:companies,id',
            'company_name' => 'required',
        ]);

        $user_id = $request->input('user_id');
        $comp_id = $request->input('comp_id');
        $company_name = $request->input('company_name');

        $user_company = UserCompanies::where(['user_id' => $user_id, 'comp_id' => $comp_id])->first();

        if ($user_company) {
            $user = $request->user();
            $invity = User::find($user_id);

            $user_company->watch_invited = true;
            $user_company->watch_invited_at = now()->toDateTimeString();
            $user_company->save();

            $message = (new WatchInvitation(['company_name' => $company_name, 'inviter' => $user, 'invity' => $invity]))->onQueue(config('motion.DEFAULT_QUEUE'));
            Mail::to($invity->email)->queue($message);

            return response()->json(['user_company' => $user_company], 200);
        } else {
            return response()->json(['error' => 'Invalid User'], 401);
        }
    }
}
