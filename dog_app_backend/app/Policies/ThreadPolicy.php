<?php

namespace App\Policies;

use App\Models\User;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;

class ThreadPolicy
{
    use HandlesAuthorization;


    /**
     * Determine whether the user can see a thread.
     *
     * @param  \App\Models\User  $user
     * @param  \Cmgmyr\Messenger\Models\Thread  $thread
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function show(User $user, Thread $thread)
    {
        return $thread->hasParticipant($user->id);
    }

    /**
     * Determine whether the user can reply in a thread.
     *
     * @param  \App\Models\User  $user
     * @param  \Cmgmyr\Messenger\Models\Thread  $thread
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Thread $thread)
    {
        return $thread->hasParticipant($user->id);
    }
}
