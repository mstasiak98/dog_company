<?php

namespace App\Rules;

use Carbon\Carbon;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;

class EndDateGreaterThanStartDate implements Rule, DataAwareRule
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
        $endDate = Carbon::createFromFormat('Y-m-d H:i:s', $value);
        $startDate = Carbon::createFromFormat('Y-m-d H:i:s', $this->data['start_date']);
        return $endDate->greaterThan($startDate);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Data zakończenia nie może być wcześniejsza niż data rozpoczęcia.';
    }

    public function setData($data)
    {
        $this->data = $data;
    }
}
