<?php

namespace App\Rules;

use App\Models\Feature;
use Illuminate\Contracts\Validation\Rule;

class FeatureExists implements Rule
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
        foreach ($value as $item) {
            if (!\is_numeric($item) || \intval($item) <= 0) {
                return false;
            }
            if (!Feature::where('id', $item)->exists()) {
                return false;
            }
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Wybrana cecha nie istnieje';
    }
}
