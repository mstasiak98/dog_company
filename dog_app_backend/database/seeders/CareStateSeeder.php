<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CareStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('care_states')->insert([
            'name' => 'Zaproponowana',
        ]);

        DB::table('care_states')->insert([
            'name' => 'Zaakceptowana przez właściciela',
        ]);

        DB::table('care_states')->insert([
            'name' => 'Odrzucona przez właściciela',
        ]);

        DB::table('care_states')->insert([
            'name' => 'Zrealizowana',
        ]);

        DB::table('care_states')->insert([
            'name' => 'Anulowana',
        ]);
    }
}
