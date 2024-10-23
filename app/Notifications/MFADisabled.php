<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class MFADisabled extends Notification implements ShouldQueue
{
    use Queueable;

    protected  $data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->data = $data;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $date = Carbon::now();

        return (new MailMessage)
            ->subject('Disabled Multi-Factor Authentication')
            ->greeting('Hello ' . $this->data['first_name'] . ',')
            ->line('Multi-Factor Authentication has been disabled in your account on ' . $date->toCookieString())
            ->line('IP Address: ' . $this->data['ip_address'])
            ->line('System Used: ' . $this->data['user_agent']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $date = Carbon::now();

        return [
            'subject' => 'Disabled Multi-Factor Authentication',
            'greeting' => 'Hello ' . $this->data['first_name'],
            'message' => '<p>Multi-Factor Authentication has been disabled in your account on ' . $date->toCookieString() . '</p>
            <p></p>
            <p>IP Address: ' . $this->data['ip_address'] . '</p>
            <p>System Used: ' . $this->data['user_agent'] . '</p>
            ',
        ];
    }
}
