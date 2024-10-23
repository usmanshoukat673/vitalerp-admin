<?php

namespace App\Http\Controllers;

use App\Traits\PasswordRotation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserController extends Controller
{

    use PasswordRotation;

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function changeCurrentPassword(Request $request)
    {
        $this->validate($request, [
            'password'         => [
                'required',
                'string',
                'min:10',
                'confirmed',
                'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$%\^&\*_\-\+\=]).{10,}$/', // At least 1 upper, 1 lower, 1 digit, 1 special character, and minimum 10 characters
            ],
            'password_confirmation' => 'required|min:10',
        ], [
            'password.regex' => 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*_-+=).',
            'password.min' => 'Password must be at least 10 characters long.',
            'password.confirmed' => 'Password confirmation does not match.',
        ]);

        $user = $request->user();

        if (Hash::check(request('password'), $user->password)) {
            return response()->json(['errors' => ['password' => ['New Password should be different than the current password.']]], 422);
        }

        $user->forceFill([
            'password'       => bcrypt(request('password')),
            'remember_token' => Str::random(60),
        ])->save();

        $data['first_name'] = $user->first_name;
        $data['ip_address'] = $request->ip();
        $data['user_agent'] = $request->header('user-agent');

        $user->changed_password = 1;
        $user->save();

        $user->passwordActivities()->create([
            'ip' => $request->ip(),
            'system' => $request->header('user-agent')
        ]);

        $user->sendPasswordChangedNotification($data);

        [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels] = $this->getUserData($user);

        $redirect = '/select-organization';

        if ($user->agreement_accepted === 0) {
            $redirect = '/user/agreement';
        }

        return response()->json([
            'message' => 'Your password has been changed successfully!',
            'user' => $user,
            'pwd_rotaion' => $pwd_rotaion,
            'redirect' => $redirect,
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $this->validate($request, [
            'current_password' => 'required',
            'password'         => [
                'required',
                'string',
                'min:10',
                'confirmed',
                'regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#\$%\^&\*_\-\+\=]).{10,}$/', // At least 1 upper, 1 lower, 1 digit, 1 special character, and minimum 10 characters
            ],
            'password_confirmation' => 'required|min:10',
        ], [
            'password.regex' => 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*_-+=).',
            'password.min' => 'Password must be at least 10 characters long.',
            'password.confirmed' => 'Password confirmation does not match.',
        ]);


        $user = $request->user();

        if (Hash::check(request('current_password'), $user->password)) {

            if (Hash::check(request('password'), $user->password)) {
                return response()->json(['errors' => ['password' => ['New Password should be different than the current password.']]], 422);
            }

            $user->forceFill([
                'password'       => bcrypt(request('password')),
                'remember_token' => Str::random(60),
            ])->save();

            $data['first_name'] = $user->first_name;
            $data['ip_address'] = $request->ip();
            $data['user_agent'] = $request->header('user-agent');

            $user->passwordActivities()->create([
                'ip' => $request->ip(),
                'system' => $request->header('user-agent')
            ]);

            $user->sendPasswordChangedNotification($data);

            $pwd_rotaion = $this->determineRotation($user);

            return response()->json(['message' => 'Your password has been changed successfully!', 'pwd_rotaion' => $pwd_rotaion], 200);
        } else {

            return response()->json(['errors' => ['current_password' => ['The given current Password is invalid.']]], 422);
        }
    }

    public function updateProfile(Request $request)
    {
        $this->validate($request, [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
        ]);

        $id = $request->user()->id;

        $user = User::find($id)->update(['first_name' => $request->input('first_name'), 'last_name' => $request->input('last_name')]);

        if ($request->wantsJson()) {
            return response()->json(['user' => User::find($id)], 200);
        }

        return $user;
    }
}
