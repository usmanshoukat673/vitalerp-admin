<?php

namespace App\Jobs;

use App\Mail\MFAReminder;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class MFARemindProcessor implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $message = (new MFAReminder(['user' => $this->user]))->onQueue(config('motion.DEFAULT_QUEUE'));
        Mail::to($this->user->email)->queue($message);

        $this->user->mfa_reminder = now()->toDateTimeString();
        $this->user->save();
    }
}
