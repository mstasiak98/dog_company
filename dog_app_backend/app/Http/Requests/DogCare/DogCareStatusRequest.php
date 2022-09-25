<?php

namespace App\Http\Requests\DogCare;

use Illuminate\Foundation\Http\FormRequest;

class DogCareStatusRequest extends FormRequest
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
            'dogCareId' => ['required', 'exists:dog_cares,id']
        ];
    }
}
