<?php

namespace App\Policies;

use App\Models\DogProfile;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DogProfilePolicy
{
    use HandlesAuthorization;


    /**
     * Determine whether the user can edit dog profile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DogProfile  $dogProfile
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, DogProfile $dogProfile)
    {
        return $user->id === $dogProfile->user->id;
    }

    /**
     * Determine whether the user can delete dog profile
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DogProfile  $dogProfile
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function destroy(User $user, DogProfile $dogProfile)
    {
        return $user->id === $dogProfile->user->id;
    }


    /**
     * Determine whether the user can change dog profile's visibility.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DogProfile  $dogProfile
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function changeVisibility(User $user, DogProfile $dogProfile)
    {
        return $user->id === $dogProfile->user->id;
    }

    /**
     * Determine whether the user can add photo to a dog profile
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\DogProfile  $dogProfile
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function addPhoto(User $user, DogProfile $dogProfile)
    {
        return $user->id === $dogProfile->user->id;
    }
}
