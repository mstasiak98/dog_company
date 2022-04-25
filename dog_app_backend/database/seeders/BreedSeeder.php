<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BreedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('breeds')->insert([
            'name' => 'Owczarek niemiecki',
        ]);

        DB::table('breeds')->insert([
            'name' => 'Akita',
        ]);

        DB::table('breeds')->insert([
            'name' => 'Dalmatyńczyk',
        ]);

        DB::table('breeds')->insert([
            'name' => 'Labrador',
        ]);

        DB::table('breeds')->insert([
            'name' => 'Pinczer',
        ]);
    }
}
