<?php

namespace App\Http\Controllers;

use App\Models\MaturityLevel;
use App\Models\PanelUserActivities;
use App\Models\TeamUser;
use App\Traits\PasswordRotation;
use App\Models\User;
use App\Models\UserAssigns;
use App\Models\UserCompanies;
use App\Models\UserLocation;
use App\Models\UserLocationAssigns;
use App\Models\UserTeamAssigns;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class JoinFromInvite extends Controller
{
    use PasswordRotation, DeviceHandler;

    public function signup(Request $request)
    {
        $this->validate($request, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->where(function ($query) {
                $query->where('only_panel', 0); // Apply unique rule only when only_panel is 0
            }),],
            'password' => ['required', 'string', 'min:8', 'confirmed', 'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/'],
            '_token' => ['required', 'string'],
        ]);

        $invite = UserAssigns::where(['email' => $request->input('email'), 'remember_token' => $request->input('_token')])->first();

        if (!$invite) {
            return response()->json(['errors' => ['email' => ['This user already been assigned or invalid link']]], 400);
        }

        event(new Registered($user = $this->create($request->only(['first_name', 'last_name', 'email', 'password']))));

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

        $locations = UserLocationAssigns::where(['user_assign_id' => $invite->id])->get();

        if (count($locations) > 0) {
            foreach ($locations as $locAssign) {
                UserLocation::create(['user_id' => $user->id, 'location_id' => $locAssign->location_id, 'assigned_by' => $invite->assigned_by, 'comp_id' => $invite->assigned_to]);
            }
        }

        $tokenResult = $this->loginUser($user);

        $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        $maturity_levels = MaturityLevel::select('id', 'name', 'value')->orderBy('name', 'asc')->get();

        $pwd_rotaion = $this->determineRotation($user);

        $new_device = $this->identifyAsset($request);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Your account has been created successfully!',
                'token' => [
                    'access_token' => $tokenResult->accessToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse(
                        $tokenResult->token->expires_at
                    )->toDateTimeString()
                ],
                'user' => $user,
                'pwd_rotaion' => $pwd_rotaion,
                'companies' => $companies,
                'maturity_levels' => $maturity_levels,
                'new_device' => $new_device
            ], 200);
        }

        return response(['message' => 'Your account has been created successfully!'], 200);
    }

    protected function create(array $data)
    {
        $user = User::where(['email' => $data['email'], 'only_panel' => 1])->first();

        if (!$user) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'changed_password' => 1,
                'password' => Hash::make($data['password']),
            ]);
        }
        else{
            $user->only_panel = 0;
            $user->save();
            // save activity 
            PanelUserActivities::create(['user_id' => $user->id, 'description' => 'Converted from Policy Panel user to active user']);
        }

        $user = User::find($user->id);

        return $user;
    }

    protected function loginUser($user)
    {
        $this->guard()->login($user);
        return $user->createToken('Cloud Join Personal Access Token');
    }

    protected function guard()
    {
        return Auth::guard();
    }
}
