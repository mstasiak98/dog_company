<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AvailabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('availabilities')->insert([
            'name' => 'Tydzień - do południa',
        ]);

        DB::table('availabilities')->insert([
            'name' => 'Tydzień - po południu',
        ]);

        DB::table('availabilities')->insert([
            'name' => 'Tydzień - wieczorem',
        ]);

        DB::table('availabilities')->insert([
            'name' => 'Weekend',
        ]);
    }
}
