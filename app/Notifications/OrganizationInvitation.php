<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OrganizationInvitation extends Notification implements ShouldQueue
{
    use Queueable;

    public $org, $inviter, $user, $invite;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($data)
    {
        $this->org = $data['org'];
        $this->inviter = $data['inviter'];
        $this->invite = $data['invite'];
        $this->user = $data['user'];
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
            ->subject('Invitation to ' . $this->org['name'] . ' on ' . config('app.name'))
            ->greeting('Hello ' . $this->user['first_name'] . ',')
            ->line('Your teammate ' . $this->inviter['first_name'] . ' ' . $this->inviter['last_name'] . ' has invited you to the Organization ' . $this->org['name'] . ' on ' . config('app.name') . '.')
            ->line('Click here to get started:')
            ->action('Accept Invite', url('/login?redirect=' . '/accept/' . $this->invite['remember_token'] . '/' . encrypt($this->user['email'])))
            ->line('');
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
            'subject' => 'Invitation to ' . $this->org['name'] . ' on ' . config('app.name'),
            'greeting' => 'Hello ' . $this->user['first_name'],
            'content' => 'Your teammate ' . $this->inviter['first_name'] . ' ' . $this->inviter['last_name'] . ' has invited you to the Organization ' . $this->org['name'] . ' on ' . config('app.name') . '.',
            'action' => url('/accept/' . $this->invite['remember_token'] . '/' . $this->user['email'])
        ];
    }
}
