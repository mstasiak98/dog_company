<?php

namespace App\Rules;

use App\Models\Announcement;
use Illuminate\Contracts\Validation\Rule;

class UserNotAnnouncementCreator implements Rule
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
        $announcementCreatorId = Announcement::where('id', $value)->first()->user->id;
        return $announcementCreatorId !== auth()->user()->id;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Nie możesz zaakceptować swojego ogłoszenia';
    }
}
