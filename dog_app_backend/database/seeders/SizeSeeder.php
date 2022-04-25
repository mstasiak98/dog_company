<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sizes')->insert([
            'name' => 'mały',
            'description' => 'do 6 kg',
        ]);

        DB::table('sizes')->insert([
            'name' => 'średni',
            'description' => '6-18kg',
        ]);

        DB::table('sizes')->insert([
            'name' => 'duży',
            'description' => '19-40kg',
        ]);

        DB::table('sizes')->insert([
            'name' => 'bardzo duży',
            'description' => 'ponad 40kg',
        ]);
    }
}
