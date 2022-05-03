<?php

namespace Database\Seeders;

use App\Models\Breed;
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
        /*DB::table('breeds')->insert([
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
        ]);*/

        $csvFile = fopen(base_path("database/data/breeds.csv"), "r");

        while(($data = fgetcsv($csvFile, 2000, ",")) !== FALSE) {
            Breed::create([
                'name' => $data['0']
            ]);
        }

        fclose($csvFile);
    }
}
