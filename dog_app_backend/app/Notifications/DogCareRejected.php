<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DogCareRejected extends Notification implements ShouldQueue
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

        return (new MailMessage)
            ->subject('Opieka odrzucona')
            ->greeting('Cześć '.$guardian->first_name.',')
            ->line('Niestety, ale użytkownik ' .$owner->first_name.' odrzucił twoją propozycję opieki')
            ->line('Być może, zgodziłby się na opiekę w innym terminie.')
            ->line('Skontaktuj się z właścicielem lub złóż propozycję innym właścicielom. Na pewno Ci się uda!')
            ->action('Zobacz inne profile psów lub ogłoszenia', env('FRONT_URL').'/aplikacja/poszukuja-opieki');
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
