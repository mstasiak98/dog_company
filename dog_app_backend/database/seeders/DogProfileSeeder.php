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

        /*DB::table('dog_profiles')->insert([
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
        ]);*/
    }
}
