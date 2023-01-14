<?php

namespace App\Http\Resources;

use App\Models\Breed;
use Illuminate\Http\Resources\Json\JsonResource;
use function PHPUnit\Framework\isNull;

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


        $user = is_null($this->dogProfile) ? $this->announcement->user : $this->dogProfile->user;

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
            'owner' => new UserResource($user),
            'dog_name' => !is_null($this->dogProfile) ? $this->dogProfile->name : null,
            'dog_breed' => !is_null($this->dogProfile) ? new BreedResource($this->dogProfile->breed) : null,
            'dog_profile_id' => !is_null($this->dogProfile) ? $this->dogProfile->id : null,
            'announcement_id' => !is_null($this->announcement) ? $this->announcement->id : null,
        ];
    }
}
