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

        DogProfile::factory()->count(50)->create()->each(function($profile){
            for($i=0; $i < rand(1,3); $i++) {
                DB::table('dog_profile_feature')->insert([
                    'dog_profile_id' => $profile->id,
                    'feature_id' => Feature::select('id')->orderByRaw("RAND()")->first()->id
                ]);
            }

            for($i=0; $i < rand(1,3); $i++) {
                DB::table('availability_dog_profile')->insert([
                    'dog_profile_id' => $profile->id,
                    'availability_id' => Availability::select('id')->orderByRaw("RAND()")->first()->id
                ]);
            }

            for($i=0; $i < rand(1,3); $i++) {
                DB::table('activity_dog_profile')->insert([
                    'dog_profile_id' => $profile->id,
                    'activity_id' => Activity::select('id')->orderByRaw("RAND()")->first()->id
                ]);
            }
        });
    }
}
