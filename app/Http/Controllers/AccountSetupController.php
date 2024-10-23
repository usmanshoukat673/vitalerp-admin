<?php

namespace App\Http\Controllers;

use App\Http\Traits\AccountCreation;
use App\Models\MaturityLevel;
use App\Models\UserCompanies;
use App\Traits\PasswordRotation;
use Carbon\Carbon;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class AccountSetupController extends Controller
{
    use AccountCreation, DeviceHandler, PasswordRotation;

    public function setup(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->where(function ($query) {
                $query->where('only_panel', 0); // Apply unique rule only when only_panel is 0
            }),],
            'company_name' => 'required',
            'password' => ['required', 'string', 'min:8', 'confirmed', 'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/'],
        ]);
        $email = $request->input('email');
        $company_name = $request->input('company_name');
        $password = $request->input('password');
        $fisrt_name = explode('@', $email)[0];

        event(new Registered($user = $this->create(['company_name' => $company_name, 'first_name' => $fisrt_name, 'last_name' => '.', 'email' => $email], $password)));

        $user->changed_password = 1;
        $user->save();

        $tokenResult = $this->loginUser($user);
        $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => 'DYI portal login']);
        $pwd_rotaion = $this->determineRotation($user);
        $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();
        $maturity_levels = MaturityLevel::select('id', 'name', 'value')->orderBy('name', 'asc')->get();
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
