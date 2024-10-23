<?php

namespace App\Http\Controllers;

use App\Mail\SendLoginOTP;
use App\Models\User;
use App\Traits\PasswordRotation;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Mail;

class LoginEmailOTPController extends Controller
{
    use PasswordRotation;

    public function validateOTP(Request $request)
    {
        $this->validate($request, [
            'otp' => 'required',
        ]);

        $user = $request->user();
        $inputOtp = $request->input('otp');

        if (Carbon::now()->greaterThan($user->otp_expires_at)) {
            return response()->json(['error' => 'One time password expired'], 400);
        }

        $storedOtp = Crypt::decryptString($user->otp_code);

        if ($inputOtp === $inputOtp) {

            $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => 'Email OTP login']);

            [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels] = $this->getUserData($user);

            $redirect = '/select-organization';

            if ($user->agreement_accepted === 0) {
                $redirect = '/user/agreement';
            }
            elseif ($user->changed_password === 0) {
                $redirect = '/user/change-password';
            }
            elseif ($pwd_rotaion['pwd_warning'] === 2) {
                $redirect = '/user/password-expired';
            }

            return response()->json([
                'message' => 'OTP validated',
                'redirect' => $redirect,
                'pwd_rotaion' => $pwd_rotaion,
                'companies' => $companies,
                'maturity_levels' => $maturity_levels,
                'supplier' => $userSupplier,
                'user' => $user
            ], 200);
        }

        return response()->json(['error' => 'Invalid One time password.'], 400);
    }

    public function resendEmailOtp(Request $request)
    {
        $user = $request->user();

        $this->generateAndSendOTP($user);

        return response()->json(['message' => 'One time password sent successfully.'], 200);
    }

    public function generateAndSendOTP(User $user)
    {
        $otp = rand(100000, 999999);

        $encryptedOtp = Crypt::encryptString($otp);

        $user->otp_code = $encryptedOtp;
        $user->otp_expires_at = Carbon::now()->addMinutes(10);
        $user->save();

        Mail::to($user->email)->send(new SendLoginOTP($user, $otp));
    }
}