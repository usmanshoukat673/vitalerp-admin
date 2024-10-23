<?php

namespace App\Http\Controllers;

use App\Models\LoginActivity;
use App\Models\MFAActivities;
use App\Models\PasswordActivity;
use Illuminate\Http\Request;

class UserActivitiesController extends Controller
{
    public function login(Request $request)
    {
        $user = $request->user();
        $activities = LoginActivity::where(['user_id' => $user->id])->orderby('created_at', 'desc')->paginate(5);

        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        $activities;
    }

    public function password(Request $request)
    {
        $user = $request->user();
        $activities = PasswordActivity::where(['user_id' => $user->id])->orderby('created_at', 'desc')->paginate(5);

        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        $activities;
    }

    public function mfa(Request $request)
    {
        $user = $request->user();
        $activities = MFAActivities::where(['user_id' => $user->id])->orderby('created_at', 'desc')->paginate(5);

        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        $activities;
    }
}
