<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SendLoginOTP extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels; 

    public $user;
    public $otp;

    /**
     * Create a new message instance.
     *
     * @param $user
     * @param $otp
     */
    public function __construct($user, $otp)
    {
        $this->user = $user;
        $this->otp = $otp;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.otp')
                    ->subject('Your One-Time Password (OTP) for Login')
                    ->with([
                        'userName' => $this->user->first_name,
                        'otp' => $this->otp,
                    ]);
    }
}
