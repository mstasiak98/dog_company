<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Announcement;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Announcement::factory()->count(50)->create()->each(function($announcement){
            for($i=0; $i < 3; $i++) {
                DB::table('activity_announcement')->insert([
                    'announcement_id' => $announcement->id,
                    'activity_id' => $i+1
                ]);
            }
        });
    }
}
