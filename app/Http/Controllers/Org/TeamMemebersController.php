<?php

namespace App\Http\Controllers\Org;

use App\Http\Controllers\Controller;
use App\Mail\NewTeamMemeberAdded;
use App\Models\PanelUserActivities;
use App\Models\TeamUser;
use App\Models\User;
use App\Models\UserAssigns;
use App\Models\UserCompanies;
use App\Models\UserLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Str;

class TeamMemebersController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function addTeamMember(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'string', 'email', 'max:255'],
            'comp_id' => 'required',
            'teams' => 'required',
            'locations' => 'required',
            'company' => 'required',
        ]);

        $user = $request->user();

        $email = $request->input('email');
        $comp_id = $request->input('comp_id');
        $teams = $request->input('teams');
        $locations = $request->input('locations');

        if ($user->email == $email) {
            return response()->json(['errors' => ['email' => ['This is your email address, you can assign yourself into teams from All Setting -> Teams section if needed.']]], 400);
        }

        if ($exiting_user = $this->emailExists($email)) {
            // then look for the assign
            if (UserCompanies::where([
                'comp_id' => $comp_id,
                'user_id' => $exiting_user->id,
            ])
                ->first()
            ) {
                return response()->json(['errors' => ['email' => ['This user already been added to the organization.']]], 400);
            } else {
                // assign teams
                // send email

                $comp_user = UserCompanies::create([
                    'comp_id' => $comp_id,
                    'user_id' => $exiting_user->id,
                    'role' => 'N',
                    'assigned_by' => $user->id
                ]);

                if (count($teams) > 0) {
                    foreach ($teams as $team_id) {
                        TeamUser::create(['user_id' => $exiting_user->id, 'team_id' => $team_id, 'assigned_by' => $user->id]);
                    }
                }

                if (count($locations) > 0) {
                    foreach ($locations as $location_id) {
                        UserLocation::create([
                            'user_id' => $exiting_user->id,
                            'location_id' => $location_id,
                            'assigned_by' => $user->id,
                            'comp_id' => $comp_id,
                            'default' => false
                        ]);
                    }
                }

                $exiting_user->sendOrgDepartmentInvitation(['org' => $request->input('company'), 'inviter' => $user, 'user' => $exiting_user]);

                return response()->json(['user' => $comp_user], 200);
            }
        }

        $password =  Str::random(8);

        // The new user
        event(new Registered($new_user = $this->createUser($email, $password)));
        // assign comp
        $comp_user = UserCompanies::create([
            'comp_id' => $comp_id,
            'user_id' => $new_user->id,
            'role' => 'N',
            'assigned_by' => $user->id
        ]);

        // assing teams
        if (count($teams) > 0) {
            foreach ($teams as $team_id) {
                TeamUser::create(['user_id' => $new_user->id, 'team_id' => $team_id, 'assigned_by' => $user->id]);
            }
        }

        // assign locations
        if (count($locations) > 0) {
            foreach ($locations as $location_id) {
                UserLocation::create([
                    'user_id' => $new_user->id,
                    'location_id' => $location_id,
                    'assigned_by' => $user->id,
                    'comp_id' => $comp_id,
                    'default' => false
                ]);
            }
        }

        // send email
        $message = (new NewTeamMemeberAdded(['org' => $request->input('company'), 'inviter' => $user, 'user' => $new_user, 'password' => $password]))->onQueue(config('motion.DEFAULT_QUEUE'));
        Mail::to($email)->queue($message);

        return response()->json(['user' => $comp_user], 200);
    }

    protected function createUser($email, $password)
    {
        $username = strstr($email, '@', true);

        $user = User::where(['email' => $email, 'only_panel' => 1])->first();

        if (!$user) {
            $user = User::create([
                'first_name' => $username,
                'last_name' => $username,
                'email' => $email,
                'changed_password' => 0,
                'password' => Hash::make($password),
            ]);
        } else {
            $user->only_panel = 0;
            $user->save();
            // save activity 
            PanelUserActivities::create(['user_id' => $user->id, 'description' => 'Converted from Policy Panel user to active user']);
        }

        $user = User::find($user->id);

        return $user;
    }

    /**
     * Determine wheter the given email is already exists
     *
     * @param [type] $email
     * @return Object || false
     */
    protected function emailExists($email)
    {
        return User::where(['email' => $email])->first();
    }

    /**
     * Determine wheter given user is alredy invited to the company
     *
     * @param [type] $email
     * @param [type] $comp_id
     * @param [type] $user
     * @return boolean
     */
    protected function alreadyInvited($email, $comp_id, $user)
    {
        return (UserAssigns::where([
            'email' => $email,
            'assigned_by' => $user->id,
            'assigned_to' => $comp_id
        ])
            ->first() ? true : false);
    }
}
