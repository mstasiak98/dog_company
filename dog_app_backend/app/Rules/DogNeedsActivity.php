<?php

namespace App\Rules;

use App\Models\DogProfile;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Database\Eloquent\Builder;

class DogNeedsActivity implements Rule, DataAwareRule
{

    protected $data = [];
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
        if(DogProfile::where('id', $this->data['dog_profile_id'])->whereHas('activities', function (Builder $query) use ($value){
            $query->where('activities.id', $value);
        })->first()) {
            return true;
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
        return 'Pies nie potrzebuje tej aktywności.';
    }

    public function setData($data)
    {
        $this->data = $data;
    }
}
