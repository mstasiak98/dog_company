<?php

namespace Database\Factories;

use App\Models\Activity;
use App\Models\CareState;
use App\Models\DogProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DogCareFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'start_date' => $this->faker->dateTimeBetween('-15 days', '+15 days'),
            'end_date' => $this->faker->dateTimeBetween('+16 days', '+60 days'),
            'guardian_id'=>User::select('id')->orderByRaw("RAND()")->first()->id,
            'activity_id'=>Activity::select('id')->orderByRaw("RAND()")->first()->id,
            'state_id'=>CareState::select('id')->orderByRaw("RAND()")->first()->id,
            'dog_profile_id'=>DogProfile::select('id')->orderByRaw("RAND()")->first()->id,
        ];
    }
}
