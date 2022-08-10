<?php

namespace App\Http\Requests\DogCare;

use App\Models\Announcement;
use App\Models\DogProfile;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Foundation\Http\FormRequest;

class DogCareAnnouncementRequest extends FormRequest
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
            'announcement_id'=>['required', 'exists:announcements,id'],
            'activity_id'=>['required', 'exists:activities,id', function($attribute, $value, $fail) {
                if(Announcement::where('id', $this->announcement_id)->whereHas('activities', function (Builder $query) use ($value){
                    $query->where('activities.id', $value);
                })->first()) {
                    return true;
                }
                $fail('Wybrany ogłoszenie nie potrzebuje tej aktywności.');
            }],
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
            'siblings'=>['nullable', function($attribute, $value, $fail) {
                if(!is_null($value) && is_bool($value)){
                    return true;
                }
                $fail('Pole rodzeństwo jest nieprawidłowe');
            }],
            'additional_info'=>['nullable'],
        ];
    }
}
