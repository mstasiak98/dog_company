<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnnouncementFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */

    static $polandBiggestCities = [
        'Warszawa',
        'Kraków',
        'Łódź',
        'Wrocław',
        'Poznań',
        'Gdańsk',
        'Szczecin',
        'Bydgoszcz',
        'Lublin',
        'Białystok',
        'Katowice',
        'Gdynia',
        'Częstochowa',
        'Radom',
        'Rzeszów'
    ];


    public function definition()
    {
        return [
            'title' => $this->faker->text(10),
            'description' => $this->faker->text(300),
            'quantity' => $this->faker->numberBetween(0,1),
            'city' => self::$polandBiggestCities[rand(0,14)],
            'start_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'end_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'user_id'=>User::select('id')->orderByRaw("RAND()")->first()->id,
        ];
    }
}
