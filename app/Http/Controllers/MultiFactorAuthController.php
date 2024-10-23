<?php

namespace App\Http\Controllers;

use App\Models\TwilioToken;
use Illuminate\Http\Request;

class MultiFactorAuthController extends Controller
{
    public function verify(Request $request)
    {
        $this->validate($request, [
            'country_code' => 'required|numeric',
            'phone' => 'required|numeric|min:12'
        ]);

        $user = $request->user();

        $user->country_code = $request->input('country_code');
        $user->phone = $request->input('phone');
        $user->save();

        $token = $user->twilio_tokens()->create();


        if ($token->sendCode()) {
            return response()->json(['id' => urlencode(encrypt($token->id)), 'user' => $user], 200);
        }

        $token->delete();

        return response()->json(['errors' => ['phone' => ['Unable to send verification code']]], 422);
    }

    public function resendOTP(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $token = $user->twilio_tokens()->create();


            if ($token->sendCode()) {
                return response()->json(['id' => urlencode(encrypt($token->id)), 'user' => $user], 200);
            }

            $token->delete();

            return response()->json(['errors' => ['code' => ['Unable to send verification code']]], 422);
        }

        return response()->json(['Unauthorized'], 401);
    }

    public function verifyOTP(Request $request)
    {
        $this->validate($request, [
            'code' => 'required|numeric|min:6',
            'id' => 'required'
        ]);

        $id = urldecode(decrypt($request->input('id')));

        $user = $request->user();

        $token = TwilioToken::where(['id' => $id, 'user_id' => $user->id, 'code' => $request->input('code')])->first();

        if ($token && $token->isValid()) {
            $token->used = 1;
            $token->save();

            $user->mfa_enabled = 1;
            $user->phone_verified = 1;
            $user->save();

            $user->mfaActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'enable' => true]);

            $data['first_name'] = $user->first_name;
            $data['ip_address'] = $request->ip();
            $data['user_agent'] = $request->header('user-agent');

            $user->sendMFAEnabledNotification($data);

            return response()->json(['user' => $user], 200);
        }

        return response()->json(['errors' => ['code' => ['Invalid verification code']], 'id' => $id], 422);
    }

    public function disable(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Session Expired'], 401);
        }

        $user->mfa_enabled = 0;
        $user->save();
        $user->mfaActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'enable' => false]);

        $data['first_name'] = $user->first_name;
        $data['ip_address'] = $request->ip();
        $data['user_agent'] = $request->header('user-agent');

        $user->sendMFADisabledNotification($data);

        return response()->json(['user' => $user], 200);
    }
}
