<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DogCareCancelled extends Notification implements ShouldQueue
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
        $owner = $this->data->dogProfile ? $this->data->dogProfile->user : $this->data->announcement->user;

        if($this->data->dogProfile) {
            $rejectMessage = 'psa: '.$this->data->dogProfile->name;
        } else{
            $rejectMessage = 'ogłoszenia: '.$this->data->announcement->title;
        }

        return (new MailMessage)
            ->subject('Opieka anulowana')
            ->greeting('Cześć '.$owner->first_name.',')
            ->line('Niestety, ale użytkownik ' .$guardian->first_name.' anulował swoją propozycję opieki dla '
                .$rejectMessage)
            ->line('Być może, byłby w stanie zaopiekować się twoim psem w innym terminie.')
            ->line('Skontaktuj się z opiekunem lub poczekaj na inną propozycję.');
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
