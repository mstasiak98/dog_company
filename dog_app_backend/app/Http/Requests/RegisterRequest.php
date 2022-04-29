<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'email'=>['required','unique:users','email'],
            'password'=>['required', 'min:6'],
            'phone_number'=>['required', 'unique:users', 'regex:/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/'],
            'city'=>['required'],
            'street'=>['required'],
            'zip_code'=>['required', 'regex:/^([0-9]{2})(-[0-9]{3})?$/i'],
            'house_number'=>['required']
        ];
    }

    public function prepareForValidation() {
        // dane w requescie nie sa w postaci obiektu, tylko jsona w stringu, tutaj je zamieniam na obiekt
        $accountData = is_string($this->get('data')) ?
            json_decode($this->get('data')) : (object) ($this->get('data'));

        // zamiana std class na array
        $args=json_decode(json_encode($accountData), true);
        if(!$args){
            $args = [];
        }

        $this->replace($args);
    }
}
