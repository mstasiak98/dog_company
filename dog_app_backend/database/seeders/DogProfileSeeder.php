<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DogProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('dog_profiles')->insert([
            'name' => 'Barry',
            'color' => 'Brown',
            'visible' => 1,
            'breed_id' => 1,
            'size_id' => 1
        ]);

        DB::table('activity_dog_profile')->insert([
            'activity_id'=>1,
            'dog_profile_id' => 1,
        ]);

        DB::table('availability_dog_profile')->insert([
            'availability_id'=>1,
            'dog_profile_id' => 1,
        ]);

        DB::table('dog_profile_feature')->insert([
            'feature_id'=>1,
            'dog_profile_id' => 1,
        ]);
    }
}
