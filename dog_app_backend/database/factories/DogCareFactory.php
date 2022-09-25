<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\CareState;
use App\Models\DogProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

class DogCareFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $start= Carbon::createFromTimeStamp($this->faker->dateTimeBetween('-30 days', '+30 days')->getTimestamp());
        $end = Carbon::createFromFormat('Y-m-d H:i:s', $start)->addHour();
        $careState = CareState::select('id')->orderByRaw("RAND()")->first()->id;
        $rating = $careState == 4 ? $this->faker->numberBetween(1,5) : null;
        $comment = $careState == 4 ? $this->faker->text(150) : null;
        return [
            'start_date' => $start,
            'end_date' => $end,
            'guardian_id'=>User::select('id')->orderByRaw("RAND()")->first()->id,
            'activity_id'=>Activity::select('id')->orderByRaw("RAND()")->first()->id,
            'state_id'=>$careState,
            'dog_profile_id'=>DogProfile::select('id')->orderByRaw("RAND()")->first()->id,
            'rating'=>$rating,
            'comment'=>$comment,
        ];
    }
}
