<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FeatureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('features')->insert([
            'name' => 'Przyjazny psom',
        ]);

        DB::table('features')->insert([
            'name' => 'Przyjazny kotom',
        ]);

        DB::table('features')->insert([
            'name' => 'Przyjazny dzieciom',
        ]);

        DB::table('features')->insert([
            'name' => 'Wytresowany',
        ]);
    }
}
