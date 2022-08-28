<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AnnouncmentResource extends JsonResource
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
            'title' => $this->title,
            'description' => $this->description,
            'quantity' => $this->quantity,
            'city' => $this->city,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'user' => new OwnerResource($this->user),
            'activity' => ActivityResource::collection($this->activities),
            'photo' => PhotoResource::collection($this->photos)
        ];
    }
}
