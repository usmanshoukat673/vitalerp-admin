<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class FreshserviceFailed extends Notification implements ShouldQueue
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
        return (new MailMessage)
            ->subject('Freshservice Failed to Connect')
            ->greeting('Hello ' . $this->data['first_name'] . ',')
            ->line('Freshservice has failed to connect from your '.config('app.name').' account on ' . $this->data['failed_at'])
            ->line('Company Name: ' . $this->data['company_name'])
            ->line('Kindly check your freshservice account for more details');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'subject' => 'Freshservice Failed to Connect',
            'greeting' => 'Hello ' . $this->data['first_name'],
            'message' => '<p>Freshservice has failed to connect from your '.config('app.name').' account on ' . $this->data['failed_at'] . '</p>
            <p></p>
            <p>Company Name :' . $this->data['company_name'] . '</p>
            <p>Kindly check your freshservice account for more details</p>
            ',
        ];
    }
}
