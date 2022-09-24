<?php

namespace App\Services\Users;

use App\Http\Resources\Comments\CommentCollection;
use App\Models\DogCare;

class UserService
{

    public function getCommentsForGuardian($user)
    {
        $dogCares = DogCare::where('guardian_id', $user->id)->whereNotNull('rating');
        return $dogCares->paginate(config('app.default_comments_page_size'))->withQueryString();
    }


}
