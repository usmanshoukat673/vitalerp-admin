<?php

namespace App\Http\Controllers;

use App\Models\MaturityLevel;
use App\Traits\PasswordRotation;
use App\Models\TwilioToken;
use App\Models\UserCompanies;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserMFAController extends Controller
{
    use PasswordRotation;

    public function verifyOTP(Request $request)
    {
        $this->validate($request, [
            'code' => 'required|numeric|min:6',
            'id' => 'required'
        ]);

        $id = '';

        try {
            $id = urldecode(decrypt($request->input('id')));
        } catch (\Throwable $th) {
            return response()->json(['errors' => ['code' => ['Invalid request.']], 'id' => $id], 422);
        }

        $user = $request->user();

        $token = TwilioToken::where(['id' => $id, 'user_id' => $user->id, 'code' => $request->input('code')])->first();

        if ($token && $token->isValid()) {
            $token->used = 1;
            $token->save();

            $tokenResult =  $user->createToken('Cloud Join Personal Access Token');

            $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => 'Credentials login with MFA']);

            $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

            $maturity_levels = MaturityLevel::select('id', 'name', 'value')->orderBy('name', 'asc')->get();

            $pwd_rotaion = $this->determineRotation($user);

            if ($request->wantsJson()) {
                return response()->json([
                    'mfa_required' => false,
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
                ], 200);
            }
        }

        return response()->json(['errors' => ['code' => ['Invalid verification code']], 'id' => $id], 422);
    }

    public function resendOTP(Request $request)
    {
        $user = $request->user();

        if ($user) {
            $token = $user->twilio_tokens()->create();

            if ($token->sendCode()) {
                return response()->json(['id' => urlencode(encrypt($token->id))], 200);
            }

            $token->delete();

            return response()->json(['errors' => ['code' => ['Unable to send verification code']]], 422);
        }

        return response()->json(['Unauthorized'], 401);
    }
}
