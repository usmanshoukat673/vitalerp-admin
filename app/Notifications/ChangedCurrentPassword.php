<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class ChangedCurrentPassword extends Notification implements ShouldQueue
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
            ->subject('Password Changed')
            ->greeting('Hello ' . $this->data['first_name'] . ',')
            ->line('Your account password is successfully changed on ' . $date->toCookieString())
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
            'subject' => 'Password Changed',
            'greeting' => 'Hello ' . $this->data['first_name'],
            'message' => '<p>Your account password is successfully changed on ' . $date->toCookieString() . '</p>
            <p></p>
            <p>IP Address: ' . $this->data['ip_address'] . '</p>
            <p>System Used: ' . $this->data['user_agent'] . '</p>
            ',
        ];
    }
}
