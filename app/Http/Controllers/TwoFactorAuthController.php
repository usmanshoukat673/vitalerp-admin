<?php

namespace App\Http\Controllers;

use App\Traits\PasswordRotation;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PragmaRX\Google2FALaravel\Google2FA;

class TwoFactorAuthController extends Controller
{

    use PasswordRotation;

    public function setup2FA(Request $request)
    {
        $user = $request->user();

        DB::beginTransaction();

        try {

            $user->generateSecretKey($request);

            [$qrCodeUrl, $secret] = $user->getQRUrlAndSecret();

            DB::commit();

            return response()->json(['qrCodeUrl' => $qrCodeUrl, 'secret' => $secret]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error in 2FA: " . $e->getMessage());

            return response()->json(['error' => "Something went wrong"], 500);
        }
    }

    public function later(Request $request)
    {
        $user = $request->user();

        DB::beginTransaction();

        try {

            $user->resetMFASecretKey($request);

            DB::commit();

            $redirect = '/dashboard';

            if ($user->changed_password === 0) {
                $redirect = '/user/change-password';
            }

            $pwd_rotaion = $this->determineRotation($user);

            if ($pwd_rotaion['pwd_warning'] === 2) {
                $redirect = '/user/password-expired';
            }

            [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels] = $this->getUserData($user);

            return response()->json([
                'redirect' => $redirect,
                'user' => $user,
                'pwd_rotaion' => $pwd_rotaion,
                'companies' => $companies,
                'maturity_levels' => $maturity_levels,
                'supplier' => $userSupplier
            ]);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error in 2FA: " . $e->getMessage());

            return response()->json(['error' => "Something went wrong"], 500);
        }
    }

    public function enable2FA(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        $user = $request->user();

        DB::beginTransaction();

        try {
            if ($user->verify2FA($request->otp)) {


                if(!$user->mfa_enabled)
                {
                    $user->mfa_enabled = true;
                    $user->google2fa_enabled = true;
                    $user->save();

                    $data['first_name'] = $user->first_name;
                    $data['ip_address'] = $request->ip();
                    $data['user_agent'] = $request->header('user-agent');

                    $user->sendMFAEnabledNotification($data);
                }

                $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => 'MFA enabled login']);

                [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels] = $this->getUserData($user);

                $redirect = '/dashboard';

                if ($user->changed_password === 0) {
                    $redirect = '/user/change-password';
                }

                if ($pwd_rotaion['pwd_warning'] === 2) {
                    $redirect = '/user/password-expired';
                }

                DB::commit();

                return response()->json([
                    'redirect' => $redirect,
                    'message' => 'Verification successful',
                    'pwd_rotaion' => $pwd_rotaion,
                    'companies' => $companies,
                    'maturity_levels' => $maturity_levels,
                    'supplier' => $userSupplier,
                    'user' => $user
                ]);
            }

            return response()->json(['message' => 'Invalid OTP'], 400);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error in 2FA: " . $e->getMessage());
            return response()->json(['error' => "Something went wrong"], 500);
        }
    }

    public function verify(Request $request)
    {
        $request->validate([
            'otp' => 'required|numeric',
        ]);

        $user = $request->user();

        DB::beginTransaction();

        try {
            if ($user->verify2FA($request->otp)) {
                $user->mfa_enabled = true;
                $user->google2fa_enabled = true;
                $user->save();

                $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => 'MFA enabled login']);

                [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels] = $this->getUserData($user);

                $redirect = '/dashboard';

                if ($user->changed_password === 0) {
                    $redirect = '/user/change-password';
                }

                if ($pwd_rotaion['pwd_warning'] === 2) {
                    $redirect = '/user/password-expired';
                }

                DB::commit();

                return response()->json([
                    'redirect' => $redirect,
                    'message' => 'Verification successful',
                    'pwd_rotaion' => $pwd_rotaion,
                    'companies' => $companies,
                    'maturity_levels' => $maturity_levels,
                    'supplier' => $userSupplier,
                    'user' => $user
                ]);
            }

            return response()->json(['message' => 'Invalid OTP'], 400);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error("Error in 2FA: " . $e->getMessage());
            return response()->json(['error' => "Something went wrong"], 500);
        }
    }
}
