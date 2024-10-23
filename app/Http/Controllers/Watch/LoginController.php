<?php

namespace App\Http\Controllers\Watch;

use App\Http\Controllers\Controller;
use App\Mail\UserLockout;
use App\Mail\UserTempLockout;
use App\Models\Lockout;
use App\Models\MaturityLevel;
use App\Models\UserCompanies;
use App\Traits\APIResponseCleaner;
use Carbon\Carbon;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use AuthenticatesUsers, APIResponseCleaner;

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
        $tokenResult =  $user->createToken('Cloud Join Personal Access Token');

        $user->loginActivities()->create(['ip' => $request->ip(), 'system' => $request->userAgent(), 'auth' => 'Credentials login']);

        // $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        $user = $this->cleanUser($user);

        if ($request->wantsJson()) {
            return response()->json([
                'token' => [
                    'access_token' => $tokenResult->accessToken,
                    'token_type' => 'Bearer',
                    'expires_at' => Carbon::parse(
                        $tokenResult->token->expires_at
                    )->toDateTimeString()
                ],
                'user' => $user,
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
        return $request->only($this->username(), 'password');
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
