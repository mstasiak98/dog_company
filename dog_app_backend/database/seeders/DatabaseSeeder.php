<?php

namespace Database\Seeders;

use Database\Seeders\Auth\RolesSeeder;
use Database\Seeders\Auth\UsersSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(RolesSeeder::class);
        $this->call(UsersSeeder::class);
        $this->call(SizeSeeder::class);
        $this->call(BreedSeeder::class);
        $this->call(FeatureSeeder::class);
        $this->call(AvailabilitySeeder::class);
        $this->call(ActivitySeeder::class);
        $this->call(DogProfileSeeder::class);
        $this->call(CareStateSeeder::class);
    }
}
