<?php

namespace App\Http\Requests\DogProfile;

use App\Models\Activity;
use App\Models\Availability;
use App\Models\Feature;
use App\Rules\ActivityExists;
use App\Rules\AvailabilityExists;
use App\Rules\FeatureExists;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Validator;

class UpdateDogProfileRequest extends FormRequest
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
            'name'=>['required'],
            'color'=>['required'],
            'breed_id'=>['required', 'exists:breeds,id'],
            'size_id'=>['required', 'exists:sizes,id'],
            'activities'=>['required', 'array', new ActivityExists],
            'availabilities'=>['required', 'array', new AvailabilityExists],
            'features'=>['required', 'array', new FeatureExists],
            'description'=>['required'],
        ];
    }
}
