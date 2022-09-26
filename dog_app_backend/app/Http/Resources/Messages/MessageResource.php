<?php

namespace App\Http\Resources\Messages;

use App\Http\Resources\UserResource;
use App\Models\User;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Http\Resources\Json\JsonResource;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'thread_id' => $this->thread_id,
            'user_id' => $this->user_id,
            'body' => $this->body,
            'updated_at' => $this->updated_at,
            'created_at' => $this->created_at,
            'sender' => new UserResource(User::findOrFail($this->user_id)),
            'thread_name' => Thread::findOrFail($this->thread_id)->subject
        ];
    }
}
