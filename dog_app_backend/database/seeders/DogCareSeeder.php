<?php

namespace Database\Seeders;

use App\Models\DogCare;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DogCareSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DogCare::factory()->count(1000)->create();
    }
}
