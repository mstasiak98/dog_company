<?php

namespace App\Http\Controllers;

use App\Http\Resources\Comments\CommentCollection;
use App\Http\Resources\Comments\CommentResource;
use App\Http\Resources\GuardianResource;
use App\Models\User;
use App\Services\Users\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function userDetails(Request $request)
    {
        $user = User::findOrFail($request->userId);
        return response()->json(new GuardianResource($user));
    }

    public function getUserComments(Request $request, UserService $userService)
    {
        $user = User::findOrFail($request->userId);
        $comments = new CommentCollection($userService->getCommentsForGuardian($user));
        return response()->json($comments->response()->getData());
    }
}
