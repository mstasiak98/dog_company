<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can add photo
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\User  $requestUser
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function addPhoto(User $user, User $requestUser)
    {
        return $user->id === $requestUser->id;
    }

}
