<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DogProfileResource extends JsonResource
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
            'name' => $this->name,
            'color' => $this->color,
            'visible' => $this->visible,
            'breed' => new BreedResource($this->breed),
            'size' => new SizeResource($this->size),
            'activity' => ActivityResource::collection($this->activities),
            'availability' => AvailabilityResource::collection($this->availabilities),
            'feature' => FeatureResource::collection($this->features),
            'description' => $this->description,
            'photos' => PhotoResource::collection($this->photos)
        ];
    }
}
