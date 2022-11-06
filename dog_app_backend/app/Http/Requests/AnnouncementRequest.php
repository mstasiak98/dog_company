<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class AnnouncementRequest extends FormRequest
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
            'title'=>['required'],
            'city'=>['required'],
            'quantity'=>['required','integer'],
            'description'=>['required'],
            'start_date'=>['required', function($attribute, $value, $fail) {
                $data = Carbon::createFromFormat('Y-m-d H:i:s', $this->start_date);
                if($data->greaterThan(Carbon::today()->format('Y-m-d H:i:s'))){
                    return true;
                }
                $fail('Data rozpoczęcia jest nieprawidłowa.');
            }],
            'end_date'=>['required', function($attribute, $value, $fail) {
                $data = Carbon::createFromFormat('Y-m-d H:i:s', $this->start_date);
                $data2 = Carbon::createFromFormat('Y-m-d H:i:s', $this->end_date);
                if($data2->greaterThan($data)){
                    return true;
                }
                $fail('Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.');
            }],
            'user_id' => ['required', 'exists:users,id'],
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
