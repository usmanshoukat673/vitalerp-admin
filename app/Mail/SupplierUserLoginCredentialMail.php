<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SupplierUserLoginCredentialMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $user;
    public $password;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $password)
    {
        $this->user = $user;
        $this->password = $password;
    }

    public function build()
    {
        return $this->markdown('emails.supplier-user-login-crendetials-email')
            ->subject('Your user Login Details')
            ->with([
                'userName' => $this->user->first_name . ' ' . $this->user->last_name,
                'email' => $this->user->email,
                'password' => $this->password,
                'loginUrl' => config("app.url") . "/login"
            ]);
    }
}
