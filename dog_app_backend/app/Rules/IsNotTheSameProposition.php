<?php

namespace App\Rules;

use App\Models\Announcement;
use App\Models\DogCare;
use Carbon\Carbon;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Database\Eloquent\Builder;

class IsNotTheSameProposition implements Rule, DataAwareRule
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
        $startDate = Carbon::createFromFormat('Y-m-d H:i:s', $this->data['start_date']);
        $endDate = Carbon::createFromFormat('Y-m-d H:i:s', $this->data['end_date']);
        $activityId = $this->data['activity_id'];
        $guardianId = auth()->user()->id;

        $theSameProposition = DogCare::where('dog_profile_id', '=', $value)
            ->where('start_date', '=', $startDate)
            ->where('end_date', '=', $endDate)
            ->where('activity_id', '=', $activityId)
            ->where('guardian_id', '=', $guardianId)
            ->first();

        if($theSameProposition) {
            return false;
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
        return 'Złożyłeś już taką propozycję.';
    }

    public function setData($data)
    {
        $this->data = $data;
    }
}
