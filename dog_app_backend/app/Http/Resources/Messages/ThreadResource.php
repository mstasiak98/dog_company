<?php

namespace App\Http\Resources\Messages;

use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ThreadResource extends JsonResource
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
            'subject' => $this->subject,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'thread_creator' => new UserResource($this->creator()),
            'is_unread' => $this->isUnread(auth()->user()->id)
        ];
    }
}
