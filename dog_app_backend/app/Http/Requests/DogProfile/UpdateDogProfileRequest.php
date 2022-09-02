<?php

namespace App\Http\Requests\DogProfile;

use App\Models\Activity;
use App\Models\Availability;
use App\Models\Feature;
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
        Validator::extend(
            'activities', function ($attribute, $value, $parameters, $validator) {
            foreach ($value as $item) {
                if (!\is_numeric($item) || \intval($item) <= 0) {
                    return false;
                }
                if (!Activity::where('id', $item)->exists()) {
                    return false;
                }
            }
            return true;
        });

        Validator::extend(
            'availabilities', function ($attribute, $value, $parameters, $validator) {
            foreach ($value as $item) {
                if (!\is_numeric($item) || \intval($item) <= 0) {
                    return false;
                }
                if (!Availability::where('id', $item)->exists()) {
                    return false;
                }
            }
            return true;
        });

        Validator::extend(
            'features', function ($attribute, $value, $parameters, $validator) {
            foreach ($value as $item) {
                if (!\is_numeric($item) || \intval($item) <= 0) {
                    return false;
                }
                if (!Feature::where('id', $item)->exists()) {
                    return false;
                }
            }
            return true;
        });

        return [
            'name'=>['required'],
            'color'=>['required'],
            'breed_id'=>['required', 'exists:breeds,id'],
            'size_id'=>['required', 'exists:sizes,id'],
            'activities'=>['required', 'array', 'activities'],
            'availabilities'=>['required', 'array', 'availabilities'],
            'features'=>['required', 'array', 'features'],
            'description'=>['required'],
        ];
    }
}
