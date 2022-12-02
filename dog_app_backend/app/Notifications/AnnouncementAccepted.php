<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AnnouncementAccepted extends Notification implements ShouldQueue
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
        $owner = $this->data->announcement->user;

        return (new MailMessage)
            ->subject('Zaakceptowano ogłoszenie')
            ->greeting('Cześć '.$owner->first_name.',')
            ->line('Użytkownik ' .$guardian->first_name.' zaakceptował twoje ogłoszenie o potrzebnej opiece')
            ->line('Proponowany termin opieki: '.$this->data->start_date)
            ->line('Skontaktuj się z opiekunem lub zaakceptuj opiekę')
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
