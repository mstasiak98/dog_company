<?php

namespace App\Http\Requests\DogCare;

use App\Models\Announcement;
use App\Models\DogProfile;
use App\Rules\AnnouncementNeedsActivity;
use App\Rules\EndDateGreaterThanStartDate;
use App\Rules\GreaterThanToday;
use App\Rules\UserNotAnnouncementCreator;
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
            'announcement_id'=>['required', 'exists:announcements,id', new UserNotAnnouncementCreator],
            'activity_id'=>['required', 'exists:activities,id', new AnnouncementNeedsActivity],
            'additional_info'=>['nullable'],
        ];
    }
}
