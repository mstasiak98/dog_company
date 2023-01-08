<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class UserFactory extends Factory
{

    static $exampleAddresses = [
        ['Szczecin', 'Bobrowa', '70-791'],
        ['Zielona Góra', 'Żabia', '65-158'],
        ['Opole', 'Gwarków', '45-647'],
        ['Warszawa', 'Hiacyntowa', '05-077'],
        ['Łódź', 'Wojskowa', '94-259'],
        ['Warszawa', 'Zakole', '04-367'],
        ['Lublin', 'Modra', '20-525'],
        ['Poznań', 'Sandomierska', '61-351'],
        ['Mikołów', 'Słoneczna', '43-190'],

    ];

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $randomAddress = $this->faker->randomElement(self::$exampleAddresses);
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone_number' => $this->faker->unique()->phoneNumber(),
            'city' => $randomAddress[0],
            'street' => $randomAddress[1],
            'zip_code' => $randomAddress[2],
            'flat_number' => '5a',
            'house_number' => '4',
            'description' => $this->faker->text(200),
            'email_verified_at' => now(),
            'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return \Illuminate\Database\Eloquent\Factories\Factory
     */
    public function unverified()
    {
        return $this->state(function (array $attributes) {
            return [
                'email_verified_at' => null,
            ];
        });
    }
}
