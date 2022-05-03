<?php

namespace Database\Factories;

use App\Models\Breed;
use App\Models\DogProfile;
use App\Models\Size;
use Illuminate\Database\Eloquent\Factories\Factory;

class DogProfileFactory extends Factory
{

    protected $model = DogProfile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name'=>$this->faker->name(),
            'color'=>$this->faker->colorName(),
            'visible'=>1,
            'user_id'=>1,
            'breed_id'=>Breed::select('id')->orderByRaw("RAND()")->first()->id,
            'size_id'=>Size::select('id')->orderByRaw("RAND()")->first()->id,
        ];
    }
}
