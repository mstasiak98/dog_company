<?php

namespace App\Http\Resources\Comments;

use App\Models\DogCare;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
{

    function __construct(DogCare $model)
    {
        parent::__construct($model);
    }

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
            'end_date' => $this->end_date,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'issuer_firstname' => $this->dogProfile->user->first_name,
            'issuer_lastname' => $this->dogProfile->user->last_name
        ];
    }
}
