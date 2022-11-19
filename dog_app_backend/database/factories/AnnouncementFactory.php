<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

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
        $start= Carbon::createFromTimeStamp($this->faker->dateTimeBetween('-1 days', '+30 days')->getTimestamp());
        $end = Carbon::createFromFormat('Y-m-d H:i:s', $start)->addWeek();

        return [
            'title' => $this->faker->text(10),
            'description' => $this->faker->text(300),
            'quantity' => $this->faker->numberBetween(1,5),
            'city' => self::$polandBiggestCities[rand(0,14)],
            'start_date' => $start,
            'end_date' => $end,
            'user_id'=>User::select('id')->orderByRaw("RAND()")->first()->id,
        ];
    }
}
