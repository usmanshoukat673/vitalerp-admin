<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class TeamNewUserJoined extends Notification implements ShouldQueue
{
    use Queueable;

    protected $team, $joinee, $data;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($team, $joinee, $data)
    {
        $this->team = $team;
        $this->joinee = $joinee;
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
            ->subject($this->team['name'] . ' Team Notification')
            ->greeting('Hello,')
            ->line('This email is just a notification to let you know that new user has been joined to the team.')
            ->line('Here are the details ')
            ->line('User Name: ' . $this->joinee['first_name'] . ' '  . $this->joinee['last_name'])
            ->line('Team: ' . $this->team['name'])
            ->line('Joined on: ' . $this->data['joined_at'])
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
            'subject' => $this->team['name'] . ' Team Notification',
            'line1' => 'This email is just a notification to let you know that new user has been joined.',
            'line2' => 'Here are the details:',
            'line3' => 'User Name: ' . $this->joinee['first_name'] . ' '  . $this->joinee['last_name'],
            'line4' => 'Team: ' . $this->team['name'],
            'line5' => 'Joined on: ' . $this->data['joined_at']
        ];
    }
}
