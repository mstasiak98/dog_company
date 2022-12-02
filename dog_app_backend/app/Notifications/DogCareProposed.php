<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DogCareProposed extends Notification implements ShouldQueue
{
    use Queueable;

    protected $data;

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
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $guardian = $this->data->guardian;
        $owner = $this->data->dogProfile->user;

        return (new MailMessage)
            ->subject('Zaproponowano opiekę')
            ->greeting('Cześć '.$owner->first_name.',')
            ->line('Użytkownik ' .$guardian->first_name.' zaproponował opiekę dla '
                .$this->data->dogProfile->name)
            ->line('Proponowany termin opieki: '.$this->data->start_date)
            ->line('Skontaktuj się z opiekunem lub zaakceptuj propozycję')
            ->action('Propozycje', env('FRONT_URL').'/aplikacja/opieka');
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
            //
        ];
    }
}
