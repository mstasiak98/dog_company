<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Availability;
use App\Models\DogProfile;
use App\Models\Feature;
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


        // e2e testing object
        $dogProfile = DogProfile::create([
            'name' => 'Doggy',
            'color' => 'Czarny',
            'visible' => 1,
            'description' => 'Przykładowy opis testowy.',
            'user_id' => 1,
            'breed_id' => 1,
            'size_id' => 1,
        ]);

        for($i=0; $i < 4; $i++) {
            DB::table('dog_profile_feature')->insert([
                'dog_profile_id' => $dogProfile->id,
                'feature_id' => $i+1
            ]);
        }

        for($i=0; $i < 3; $i++) {
            DB::table('availability_dog_profile')->insert([
                'dog_profile_id' => $dogProfile->id,
                'availability_id' => $i + 1
            ]);
        }

        for($i=0; $i < 3; $i++) {
            DB::table('activity_dog_profile')->insert([
                'dog_profile_id' => $dogProfile->id,
                'activity_id' => $i + 1
            ]);
        }

        DogProfile::factory()->count(50)->create()->each(function($profile){

            for($i=0; $i < 4; $i++) {
                DB::table('dog_profile_feature')->insert([
                    'dog_profile_id' => $profile->id,
                    'feature_id' => $i+1
                ]);
            }

            for($i=0; $i < 3; $i++) {
                DB::table('availability_dog_profile')->insert([
                    'dog_profile_id' => $profile->id,
                    'availability_id' => $i + 1
                ]);
            }

            for($i=0; $i < 3; $i++) {
                DB::table('activity_dog_profile')->insert([
                    'dog_profile_id' => $profile->id,
                    'activity_id' => $i + 1
                ]);
            }
        });
    }
}
