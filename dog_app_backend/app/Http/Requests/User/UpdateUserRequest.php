<?php

namespace App\Http\Requests\User;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUserRequest extends FormRequest
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
            'first_name'=>['required'],
            'last_name'=>['required'],
            'phone_number'=>[
                'required',
                'regex:/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/',
                Rule::unique('users')->ignore($this->phone_number, 'phone_number')
            ],
            'city'=>['required'],
            'street'=>['required'],
            'zip_code'=>['required', 'regex:/^([0-9]{2})(-[0-9]{3})?$/i'],
            'house_number'=>['required']
        ];
    }
}
