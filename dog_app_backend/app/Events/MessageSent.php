<?php

namespace App\Events;

use App\Http\Resources\Messages\MessageResource;
use App\Http\Resources\Messages\ThreadResource;
use App\Models\User;
use Cmgmyr\Messenger\Models\Message;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;


    public $message;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Nazwa eventu na który jest wysyłana wiadomość.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'message.received';
    }

    /**
     * Wysyłaj informacje o wiadomości i wątku.
     *
     * @return array
     */
    public function broadcastWith()
    {
        return [
            'message' => new MessageResource($this->message),
            'thread' => new ThreadResource($this->message->thread)
            ];
    }

    /**
     * Wysyłaj wiadomość tylko na kanał jej adresata
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        $participants = $this->message->thread->participantsUserIds();
        $recipients = array_diff($participants, [$this->message->user_id]);
        return new PrivateChannel('users.'.strval(reset($recipients)));
    }
}
