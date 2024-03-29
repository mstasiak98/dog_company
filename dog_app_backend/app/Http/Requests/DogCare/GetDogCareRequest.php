<?php

namespace App\Http\Requests\DogCare;

use Illuminate\Foundation\Http\FormRequest;

class GetDogCareRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
           'care_state_id' => ['required', 'exists:care_states,id'],
           'user_id' => ['required', 'exists:users,id'],
           'is_owner' => ['required', 'boolean'],
        ];
    }
}
