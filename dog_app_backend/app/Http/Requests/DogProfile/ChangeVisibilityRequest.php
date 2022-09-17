<?php

namespace App\Http\Requests\DogProfile;

use Illuminate\Foundation\Http\FormRequest;

class ChangeVisibilityRequest extends FormRequest
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
            'id' => ['required', 'exists:dog_profiles,id'],
            'visible' => ['required', 'boolean'],
        ];
    }
}
