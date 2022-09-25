<?php

namespace App\Http\Controllers;

use App\Http\Resources\Messages\MessageResource;
use App\Http\Resources\Messages\ThreadCollection;
use App\Http\Resources\Messages\ThreadResource;
use App\Models\User;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class MessagesController extends Controller
{
    /**
     * Wszystkie wiadomości dla zalogowanego użytkownika
     *
     * @return mixed
     */
    public function index()
    {
        $currentUserId = auth()->user()->id;
        $threads = Thread::forUser($currentUserId)->paginate(10)->withQueryString();
        $threadsCollection = ThreadResource::collection($threads);
        return response()->json($threadsCollection->response()->getData());
    }

    /**
     * Pokaż wiadomość (wątek).
     *
     * @param Request $request
     * @return mixed
     */
    public function show(Request $request)
    {
        try {
            $thread = Thread::findOrFail($request->threadId);
        } catch (\Exception $e) {
            throw new HttpResponseException(response()->json([
                'error' => 'Brak wątku.'
            ], Response::HTTP_BAD_REQUEST));
        }

        // don't show the current user in list
        $userId = auth()->user()->id;
        //$users = User::whereNotIn('id', $thread->participantsUserIds($userId))->get();
        $thread->markAsRead($userId);

        $messages = $thread->messages;
        $messagesCollection = MessageResource::collection($messages);
        return response()->json($messagesCollection);

    }

    /**
     * Utwórz nowy wątek
     *
     * @return mixed
     */
    public function store(Request $request)
    {

        DB::transaction(function () use ($request){
            $thread = Thread::create([
                'subject' => $request->subject,
            ]);

            // Message
            Message::create([
                'thread_id' => $thread->id,
                'user_id' => auth()->user()->id,
                'body' => $request->message,
            ]);

            // Sender
            Participant::create([
                'thread_id' => $thread->id,
                'user_id' => auth()->user()->id,
                'last_read' => new Carbon,
            ]);

            // Recipients
            $thread->addParticipant($request->recipient);
        });

        return response()->json(['success' => true]);

    }

    /**
     * Dodaj wiadomość do wątku
     *
     * @param Request $request
     * @return mixed
     */
    public function update(Request $request)
    {
        try {
            $thread = Thread::findOrFail($request->threadId);
        } catch (\Exception $e) {
            throw new HttpResponseException(response()->json([
                'error' => 'Brak wątku.'
            ], Response::HTTP_BAD_REQUEST));
        }

        $thread->activateAllParticipants();

        DB::transaction(function () use ($request, $thread){
            // Message
            $message = Message::create(
                [
                    'thread_id' => $thread->id,
                    'user_id'   => auth()->user()->id,
                    'body'      => $request->body,
                ]
            );

            // Add replier as a participant
            $participant = Participant::firstOrCreate(
                [
                    'thread_id' => $thread->id,
                    'user_id'   => auth()->user()->id,
                ]
            );
            $participant->last_read = new Carbon;
            $participant->save();

            // Recipient
            if ($request->recipient) {
                $thread->addParticipant($request->recipient);
            }
        });

        return response()->json(['success' => true]);

        //$this->oooPushIt($message);
    }
}
