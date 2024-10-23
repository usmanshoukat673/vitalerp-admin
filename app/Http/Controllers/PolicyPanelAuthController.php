<?php

namespace App\Http\Controllers;

use App\Mail\PolicyPortalEmailOTP;
use App\Models\Company;
use App\Models\PortalEmailVerification;
use App\Models\StandardSharedWith;
use App\Models\User;
use App\Traits\Verification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class PolicyPanelAuthController extends Controller
{
    use Verification;

    public function verifyOTP(Request $request)
    {
        $this->validate($request, [
            'portal_link' => 'required',
            'comp_id' => 'required',
            'code' => 'required',
            'email' => 'required',
            'unique_id' => 'required',
        ]);

        $comp_id = request('comp_id');
        $otp = $request->input('code');
        $unique_id = $request->input('unique_id');
        $email = $request->input('email');

        try {
            $email = decrypt($email);
            $unique_id = decrypt($unique_id);
        } catch (\Exception $e) {
            return $this->invalidRequest();
        }

        $user = User::where(['email' => $email])->first();

        if (!$user) {
            return $this->invalidRequest();
        }

        $shared = StandardSharedWith::where(['comp_id' => $comp_id, 'user_id' => $user->id])->first();

        if (!$shared) {
            return $this->invalidRequest();
        }

        $pev = PortalEmailVerification::where(['email' => $email, 'used' => 0, 'code' => $otp, 'id' => $unique_id])->first();

        if(!$pev)
        {
            $errors['errors']['email'] = ["Invalid OTP"];
            return response()->json($errors, 422);
        }

        $pev->used = 1;
        $pev->save();

        $tokenResult =  $user->createToken('PolicyPanel:Motion Personal Access Token');

        $shared_standards = StandardSharedWith::with('standard')->where([
            'comp_id' => $comp_id,
            'user_id' => $user->id
        ])->get();

        $shared_company = Company::select('id', 'name', 'logo')->find($comp_id);

        return response()->json([
            'token' => [
                'access_token' => $tokenResult->accessToken,
                'token_type' => 'Bearer',
                'expires_at' => Carbon::parse(
                    $tokenResult->token->expires_at
                )->toDateTimeString()
            ],
            'user' => $user,
            'shared_standards' => $shared_standards,
            'shared_company' => $shared_company
        ], 200);
    }

    public function requestOTP(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'portal_link' => 'required',
            'email' => 'required',
        ]);

        $email = $request->input('email');
        $comp_id = request('comp_id');

        $user = User::where(['email' => $email])->first();

        if (!$user) {
            // return $this->invalidRequest();;
        }

        $shared = StandardSharedWith::where(['comp_id' => $comp_id, 'user_id' => $user->id])->first();

        if (!$shared) {
            return $this->invalidRequest();
        }

        [$otp, $unique_id] = $this->getOTP($email);
        $message = (new PolicyPortalEmailOTP($otp))->onQueue(config('motion.DEFAULT_QUEUE'));
        Mail::to($email)->cc(config('motion.mail_cc'))->queue($message);

        return response()->json([
            'email' => encrypt($user->email),
            'unique_id' => $unique_id
        ], 200);
    }

    public function resentOTP(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'portal_link' => 'required',
            'email' => 'required',
        ]);

        try {
            $email = decrypt($request->input('email'));
        } catch (\Throwable $th) {
            return $this->invalidRequest();
        }
        
        $comp_id = request('comp_id');

        $user = User::where(['email' => $email])->first();

        if (!$user) {
            return $this->invalidRequest();
        }

        $shared = StandardSharedWith::where(['comp_id' => $comp_id, 'user_id' => $user->id])->first();

        if (!$shared) {
          return $this->invalidRequest();
        }

        [$otp, $unique_id] = $this->getOTP($email);
        $message = (new PolicyPortalEmailOTP($otp))->onQueue(config('motion.DEFAULT_QUEUE'));
        Mail::to($email)->cc(config('motion.mail_cc'))->queue($message);

        return response()->json([
            'email' => encrypt($user->email),
            'unique_id' => $unique_id
        ], 200);
    }

    private function invalidRequest()
    {
        $errors['errors']['email'] = ["Invalid request"];
        return response()->json($errors, 422);
    }

    private function getOTP($email)
    {
        $code = $this->generateCode();
        $id = null;
        $pev = PortalEmailVerification::where(['email' => $email, 'used' => 0])->first();
        if ($pev) {
            PortalEmailVerification::where(['email' => $email, 'used' => 0])
                ->update(['code' => $code]);
            $id = encrypt($pev->id);
        } else {
           $pev = PortalEmailVerification::create([
                'email' => $email,
                'code' => $code
            ]);
            $id = encrypt($pev->id);
        }
        
        return [$code, $id];
    }
}
