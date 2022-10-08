<?php

namespace App\Policies;

use App\Models\Photo;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PhotoPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can delete photo
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Photo $photo)
    {
        $model = $photo->photoable;
        if($model instanceof \App\Models\User) {
            return $user->id === $model->id;
        }

        return $user->id === $model->user->id;
    }

    /**
     * Determine whether the user can delete photo
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Photo  $photo
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function replacePhoto(User $user, Photo $photo)
    {
        $model = $photo->photoable;
        if($model instanceof \App\Models\User) {
            return $user->id === $model->id;
        }

        return $user->id === $model->user->id;
    }
}
