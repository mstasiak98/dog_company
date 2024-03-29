<?php

namespace App\Rules;

use App\Models\DogCare;
use App\Models\DogProfile;
use Illuminate\Contracts\Validation\Rule;

class IsNotDogOwner implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $dogProfile = DogProfile::where('id', $value)->first();
        if($dogProfile) {
            $dogOwnerId = $dogProfile->user->id;
            return $dogOwnerId !== auth()->user()->id;
        }
        return false;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Nie możesz zaproponować opieki dla samego siebie';
    }
}
