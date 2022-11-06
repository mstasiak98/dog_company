<?php

namespace App\Http\Requests\Announcement;

use App\Rules\ActivityExists;
use App\Rules\EndDateGreaterThanStartDate;
use App\Rules\GreaterThanToday;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class UpdateAnnouncementRequest extends FormRequest
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
            'start_date'=>['required'],
            'end_date'=>['required', new EndDateGreaterThanStartDate],
            'user_id' => ['required', 'exists:users,id'],
            'activity_id' => ['required', 'array', new ActivityExists],
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
