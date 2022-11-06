<?php

namespace App\Http\Requests\DogCare;

use App\Models\Announcement;
use App\Models\DogProfile;
use App\Rules\AnnouncementNeedsActivity;
use App\Rules\EndDateGreaterThanStartDate;
use App\Rules\GreaterThanToday;
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
            'activity_id'=>['required', 'exists:activities,id', new AnnouncementNeedsActivity],
            'start_date'=>['required', new GreaterThanToday],
            'end_date'=>['required', new EndDateGreaterThanStartDate],
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
