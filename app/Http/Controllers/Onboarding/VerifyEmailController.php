<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Mail\VerifyEmail;
use App\Models\BuildRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\Rule;

class VerifyEmailController extends Controller
{
    public function send(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->where(function ($query) {
                $query->where('only_panel', 0); // Apply unique rule only when only_panel is 0
            }),]
        ]);

        $email = strtolower($request->input('email'));

        $br = BuildRequest::where(['email' => $email, 'active' => 1])->first();
        
        if(!$br){
            $br = BuildRequest::create([
                'ip' => $request->ip(), 'system' => $request->userAgent(),
                'email' => $email,
                'email_sent_at' => now()->toDateTimeString()
            ]);
        }

        $message = (new VerifyEmail(encrypt($br->id)))->onQueue(config('motion.DEFAULT_QUEUE'));
        Mail::to($request->input('email'))->cc(config('motion.mail_cc'))->queue($message);

        return true;
    }

    public function getBuildId(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->where(function ($query) {
                $query->where('only_panel', 0); // Apply unique rule only when only_panel is 0
            }),]
        ]);

        $email = strtolower($request->input('email'));

        $br = BuildRequest::where(['email' => $email, 'active' => 1])->first();
        
        if(!$br){
            $br = BuildRequest::create([
                'ip' => $request->ip(), 'system' => $request->userAgent(),
                'email' => $email,
                'email_sent_at' => now()->toDateTimeString()
            ]);
        }

        return encrypt($br->id);
    }

    public function getBuildIdEx(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'string', 'email', 'max:255']
        ]);

        $email = strtolower($request->input('email'));

        $br = BuildRequest::where(['email' => $email, 'active' => 1])->first();
        
        if(!$br){
            $br = BuildRequest::create([
                'ip' => $request->ip(), 'system' => $request->userAgent(),
                'email' => $email,
                'email_sent_at' => now()->toDateTimeString()
            ]);
        }

        return encrypt($br->id);
    }
}
 