<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('activities')->insert([
            'name' => 'Spacer',
        ]);

        DB::table('activities')->insert([
            'name' => 'Opieka w domu opiekuna',
        ]);

        DB::table('activities')->insert([
            'name' => 'Opieka w domu właściciela',
        ]);

        /*DB::table('activities')->insert([
            'name' => 'Opieka w hoteliku',
        ]);*/

    }
}
