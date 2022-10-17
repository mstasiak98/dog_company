<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DogCareAccepted extends Notification
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
        $dogProfile = $this->data->dogProfile;

        $address = 'Adres zamieszkania właściciela: '
            .$owner->city.', '.$owner->zip_code
            .', ulica: ' .$owner->street.', numer domu: '.$owner->house_number;

        if(!is_null($owner->flat_number)) {
            $address .= $owner->flat_number;
        }

        return (new MailMessage)
                    ->subject('Opieka zaakceptowana')
                    ->greeting('Cześć '.$guardian->first_name.',')
                    ->line('Użytkownik '.$owner->first_name.' zaakceptował twoją propozycję opieki dla '.$dogProfile->name)
                    ->action('Przejdź do opiek', env('FRONT_URL').'/aplikacja/opieka')
                    ->line('Opieka rozpoczyna się: '.$this->data->start_date)
                    ->line($address)
                    ->line('W każdej chwili możesz skontaktować się z właścicielem.')
                    ->line('Numer kontaktowy do właściciela: '.$owner->phone_number);
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
