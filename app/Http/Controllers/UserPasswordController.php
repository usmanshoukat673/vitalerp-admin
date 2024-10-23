<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserPasswordController extends Controller
{
    public function changePwdRotation(Request $request)
    {
        $this->validate($request, [
            'duration' => 'required|integer',
        ]);

        $duration = $request->input('duration');

        if ($duration > 90) {
            return response()->json(['errors' => ['duration' => ['Password Rotation should not be grether than 90 days.']]], 422);
        }

        $user = $request->user();

        $user->pwd_rotaion = $duration;
        $user->save();

        return response()->json(['message' => '', 'user' => $user], 200);
    }
}
