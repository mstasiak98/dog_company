<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;

class GuardianResource extends JsonResource
{

    function __construct(User $model)
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
            'firstName'=>$this->first_name,
            'lastName'=>$this->last_name,
            'city'=>$this->city,
            'street'=>$this->street,
            'phone_number' => $this->phone_number,
            'description' => $this->description,
            'photo' => PhotoResource::collection($this->photos),
        ];
    }
}
