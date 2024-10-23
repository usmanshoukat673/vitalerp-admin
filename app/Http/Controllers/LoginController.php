<?php

namespace App\Http\Controllers;

use App\Models\Lockout;
use App\Mail\UserLockout;
use App\Mail\UserTempLockout;
use App\Models\MaturityLevel;
use App\Models\User;
use App\Models\Supplier;
use App\Models\SupplierCompany;
use App\Models\SupplierUser;
use App\Traits\PasswordRotation;
use App\Models\UserCompanies;
use App\Models\Watch\WatchDevice;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    use PasswordRotation, AuthenticatesUsers, DeviceHandler;

    public function login(Request $request)
    {
        $request->validate([
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);

        $email = $request->input($this->username());

        $lockouts = Lockout::where(['email' => $email, 'used' => 0])
            ->where('created_at', '>=', Carbon::now()->subDay())
            ->get();

        if (count($lockouts) >= 5) {
            return response()->json(['errors' => ['email' => ['Due to frequent failed login attempts in a single day your account has been locked for 24 hours, if you need further help please contact customer support!']]], 429);
        }

        if (
            method_exists($this, 'hasTooManyLoginAttempts') &&
            $this->hasTooManyLoginAttempts($request)
        ) {
            $this->fireLockoutEvent($request);

            $latest = Lockout::where(['email' => $email, 'used' => 0])->latest()->first();
            $startTime = Carbon::now();

            if ($latest && $startTime->diffInSeconds($latest->created_at) >= 60 || !$latest) {
                Lockout::create(['email' => $email]);

                $message = (new UserTempLockout(['email' => $email, 'ip' => $request->ip(), 'system' => $request->userAgent(), 'date' => $startTime->toDateTimeString()]))->onQueue(config('motion.DEFAULT_QUEUE'));
                Mail::to($request->input('email'))->queue($message);
            }

            $lockouts = Lockout::where(['email' => $email, 'used' => 0])
                ->where('created_at', '>=', Carbon::now()->subDay())
                ->get();

            if (count($lockouts) >= 5) {
                $message = (new UserLockout(['email' => $email, 'ip' => $request->ip(), 'system' => $request->userAgent(), 'date' => $startTime->toDateTimeString()]))->onQueue(config('motion.DEFAULT_QUEUE'));
                Mail::to($request->input('email'))->bcc('systemalerts@cloudjoin.io')->queue($message);
                return response()->json(['errors' => ['email' => ['Due to frequent failed login attempts in a single day your account has been locked for 24 hours, if you need further help please contact customer support!']]], 429);
            }

            return $this->sendLockoutResponse($request);
        }

        //Verify user is active
        $user = User::where($this->username(), $email)->first();
        if ($user && $user->status !== 'Active') {
            return response()->json(['errors' => ['email' => ['Your account is '. strtolower($user->status) .'. Please contact customer support.']]], 422);
        }

        if ($this->attemptLogin($request)) {
            return $this->sendLoginResponse($request);
        }

        $this->incrementLoginAttempts($request);

        return $this->sendFailedLoginResponse($request);
    }

    /**
     * Send the response after the user was authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $this->clearLoginAttempts($request);
        Lockout::where(['email' => $request->input('email'), 'used' => 0])->update(['used' => 1]);

        if ($response = $this->authenticated($request, $this->guard()->user())) {
            return $response;
        }

        return $request->wantsJson()
            ? new Response([
                ''
            ], 204)
            : redirect()->intended($this->redirectPath());
    }

    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
        $tokenResult =  $user->createToken('vitalERP Personal Access Token');

        $new_device = $this->identifyAsset($request);

        // if($user->loginActivities()->count() === 0)
        // 13/sept/2024 - we are stricktly following the email otp
        // if (!$user->mfa_enabled) // force everyoen to use mfa
        // {
        //     return response()->json([
        //         'configure_mfa' => true,
        //         'mfa_required' => false,
        //         'token' => [
        //             'access_token' => $tokenResult->accessToken,
        //             'token_type' => 'Bearer',
        //             'expires_at' => Carbon::parse(
        //                 $tokenResult->token->expires_at
        //             )->toDateTimeString()
        //         ],
        //         'new_device' => $new_device,
        //     ], 200);
        // }

        // check if remember cookie set // 13 Sept we are not checking for remember for now
        // if ($user->mfa_enabled && !$request->input('mfa_remb')) {

        //     // $token = $user->twilio_tokens()->create();

        //     // if ($token->sendCode()) {

        //     // }
        //     // $token->delete();

        //     // return response()->json(['errors' => ['email' => ['Unable to send verification code']]], 422);

        //     return response()->json([
        //         'mfa_required' => true,
        //         'configure_mfa' => false,
        //         'token' => [
        //             'access_token' => $tokenResult->accessToken,
        //             'token_type' => 'Bearer',
        //             'expires_at' => Carbon::parse(
        //                 $tokenResult->token->expires_at
        //             )->toDateTimeString()
        //         ],
        //         'new_device' => $new_device,
        //     ], 200);
        // } else {
        $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => 'Credentials login']);

        // get users supplier  // Right now we are only allowing one to one supplier user relation for each user
        [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels] = $this->getUserData($user);

        // TODO: needs to implement redired logic when needed
        // if (isset($request->query()['return_to'])) {
        //     // Then redirect to /oauth/authorize?blablabla
        //     return redirect($request->query()['return_to']);
        // }

        $loginEmailOtpController = new LoginEmailOTPController();
        $loginEmailOtpController->generateAndSendOTP($user);

        if ($request->wantsJson()) {
            return response()->json([
                'redirect' => '/verify-login-email-otp',
                'mfa_required' => true,
                'configure_mfa' => false,
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
                'new_device' => $new_device,
                'supplier' => $userSupplier
            ], 200);
        }
    }

    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        throw ValidationException::withMessages([
            $this->username() => [trans('auth.failed')],
        ]);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        return $this->guard()->attempt(
            $this->credentials($request),
            $request->filled('remember')
        );
    }

    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        $credentials = $request->only($this->username(), 'password');
        $credentials['only_panel'] = 0;
        return $credentials;
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        if ($response = $this->loggedOut($request)) {
            return $response;
        }

        return $request->wantsJson()
            ? new Response('', 204)
            : redirect('/');
    }

    /**
     * The user has logged out of the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return mixed
     */
    protected function loggedOut(Request $request)
    {
        if ($request->wantsJson()) {
            return response()->json([
                'message' => 'Successfully logged out'
            ], 200);
        }
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }

    protected function guard()
    {
        return Auth::guard();
    }
}