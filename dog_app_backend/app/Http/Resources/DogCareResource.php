<?php

namespace App\Http\Resources;

use App\Models\Breed;
use Illuminate\Http\Resources\Json\JsonResource;

class DogCareResource extends JsonResource
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
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'additional_info' => $this->additional_info,
            'siblings' => $this->siblings,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'activity' => new ActivityResource($this->activity),
            'state' => new CareStateResource($this->careState),
            'guardian' => new UserResource($this->guardian),
            'owner' => new UserResource($this->dogProfile->user),
            'dog_name' => $this->dogProfile->name,
            'dog_breed' => new BreedResource($this->dogProfile->breed)
        ];
    }
}
