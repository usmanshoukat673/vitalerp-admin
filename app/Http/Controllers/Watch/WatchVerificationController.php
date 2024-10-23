<?php

namespace App\Http\Controllers\Watch;

use App\Http\Controllers\Controller;
use App\Models\TwilioToken;
use Illuminate\Http\Request;

class WatchVerificationController extends Controller
{
    public function saveNSendOtp(Request $request)
    {
        $this->validate($request, [
            'country_code' => 'required|numeric',
            'phone' => 'required|numeric|min:12'
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json(['Unauthorized'], 401);
        }

        $user->watch_number_cd = $request->input('country_code');
        $user->watch_number = $request->input('phone');
        $user->save();

        $token = $user->watch_twilio_tokens()->create();

        if ($token->sendWatchOTP()) {
            return response()->json(['otp_secret' => urlencode(encrypt($token->id)), 'sent_to' => $user->getWatchMaskedNumber()], 200);
        }

        $token->delete();

        return response()->json(['errors' => ['phone' => ['Unable to send verification code']]], 422);
    }

    public function sendOtp(Request $request)
    {
        $user = $request->user();

        if ($user) {

            if ($user->watch_number == '' && $user->watch_number_cd == '') {
                return response()->json(['Users Phone number has not registred, please register your phone number first.'], 422);
            }

            $token = $user->watch_twilio_tokens()->create();

            if ($token->sendWatchOTP()) {
                return response()->json(['otp_secret' => urlencode(encrypt($token->id)), 'sent_to' => $user->getWatchMaskedNumber()], 200);
            }

            $token->delete();

            return response()->json(['errors' => ['code' => ['Unable to send verification code']]], 422);
        }

        return response()->json(['Unauthorized'], 401);
    }

    public function resendOTP(Request $request)
    {
        $user = $request->user();

        if ($user) {

            if ($user->watch_number == '' && $user->watch_number_cd == '') {
                return response()->json(['Phone number has not registred with DeviceWatch, please register your phone number first.'], 422);
            }

            $token = $user->watch_twilio_tokens()->create();

            if ($token->sendWatchOTP()) {
                return response()->json(['otp_secret' => urlencode(encrypt($token->id)), 'sent_to' => $user->getWatchMaskedNumber()], 200);
            }

            $token->delete();

            return response()->json(['errors' => ['code' => ['Unable to send verification code']]], 422);
        }

        return response()->json(['Unauthorized'], 401);
    }

    public function verifyOtp(Request $request)
    {
        $this->validate($request, [
            'code' => 'required|numeric|min:6',
            'otp_secret' => 'required'
        ]);

        $id = urldecode(decrypt($request->input('otp_secret')));

        $user = $request->user();

        $token = TwilioToken::where(['id' => $id, 'user_id' => $user->id, 'code' => $request->input('code')])->first();

        if ($token && $token->isValid()) {
            $token->used = 1;
            $token->save();

            $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => '[DeviceWatch] Credentials login with MFA']);


            if ($request->wantsJson()) {
                return response()->json([
                    'message' => 'OTP Verified successfully!'
                ], 200);
            }
        }

        return response()->json(['errors' => ['code' => ['Invalid verification code']], 'otp_secret' => $request->input('otp_secret')], 422);
    }
}
