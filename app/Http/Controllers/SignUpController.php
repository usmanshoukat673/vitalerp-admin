<?php

namespace App\Http\Controllers;

use App\Http\Traits\AccountCreation;
use App\Mail\EmailOTPVerification;
use App\Mail\SignUpEmail;
use App\Models\EmailSignup;
use App\Traits\Verification;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class SignUpController extends Controller
{

    use AccountCreation, Verification;

    public function signup(Request $request)
    {
        $this->validate($request, [
            'company_name' => ['required', 'string', 'max:100'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255',
            Rule::unique('users')->where(function ($query) {
                $query->where('only_panel', 0); // Apply unique rule only when only_panel is 0
            }),]
        ]);

        $password =  Str::random(8);
        
        event(new Registered($user = $this->create($request->only(['company_name', 'first_name', 'last_name', 'email']), $password)));

        $data['email'] = $user->email;
        $data['password'] = $password;

        $message = (new SignUpEmail($data))->onQueue(config('motion.DEFAULT_QUEUE'));
        Mail::to($request->input('email'))->cc('systemalerts@cloudjoin.io')->queue($message);

        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Your account has been created successfully!'
            ], 200);
        }

        // $tokenResult = $this->loginUser($user);

        // $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        // if ($request->wantsJson()) {
        //     return response()->json([
        //         'message' => 'Your account has been created successfully!',
        //         'token' => [
        //             'access_token' => $tokenResult->accessToken,
        //             'token_type' => 'Bearer',
        //             'expires_at' => Carbon::parse(
        //                 $tokenResult->token->expires_at
        //             )->toDateTimeString()
        //         ],
        //         'user' => $user,
        //         'companies' => $companies
        //     ], 200);
        // }

        // return response(['message' => 'Your account has been created successfully!'], 200);
    }

    public function signupForFree(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->where(function ($query) {
                $query->where('only_panel', 0); // Apply unique rule only when only_panel is 0
            }),]
        ]);

        $email = $request->input('email');
        $code = $this->generateCode();


        if (EmailSignup::where(['email' => $email, 'used' => 0])->first()) {
            EmailSignup::where(['email' => $email, 'used' => 0])
                ->update(['code' => $code]);
        } else {
            EmailSignup::create([
                'email' => $email,
                'code' => $code
            ]);
        }

        $message = (new EmailOTPVerification($code))->onQueue(config('motion.DEFAULT_QUEUE'));
        Mail::to($email)->cc(config('motion.mail_cc'))->queue($message);

        return true;
    }

    public function verifyEmail(Request $request)
    {
        $this->validate($request, [
            'code' => 'required|numeric|min:6',
            'email' => 'required'
        ]);

        $code = $request->input('code');
        $email = $request->input('email');

        $emailSignup = EmailSignup::where(['email' => $email, 'used' => 0, 'code' => $code])->first();

        if ($emailSignup && $emailSignup->isValid()) {
            $emailSignup->used = 1;
            $emailSignup->save();
            if ($request->wantsJson()) {
                return response()->json([], 200);
            }
        }
        return response()->json(['errors' => ['code' => ['Invalid verification code']]], 422);
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
