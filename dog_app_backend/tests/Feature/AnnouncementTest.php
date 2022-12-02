<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class AnnouncementTest extends TestCase
{

    use RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_announcements()
    {

        $response = $this->getJson('api/announcements');
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
            $json->has('data')
            ->etc()
        );
    }

    public function test_get_announcement_details()
    {
        $user = User::factory()->create();
        $announcement = Announcement::create([
            'title' => 'test',
            'description' => $this->faker->text(300),
            'quantity' => $this->faker->numberBetween(1,5),
            'city' => 'Kalisz',
            'start_date' => $this->faker
                ->dateTimeBetween('-5 days', '+60 days'),
            'end_date' => $this->faker
                ->dateTimeBetween('-5 days', '+60 days'),
            'user_id'=>$user->id,
        ]);

        $response = $this->getJson(
            'api/announcements/announcementDetails?announcementId='
            .$announcement->id);

        $response->assertStatus(200)
            ->assertJsonPath('id', $announcement->id);
    }

    public function test_can_create_announcement()
    {

        $activity = Activity::create([
            'name' => 'Spacer',
        ]);
        $user = User::factory()->create();

        $this->actingAs($user);

        $response = $this->postJson('api/announcements/storeAnnouncement', [
            'data' => [
                'title' => $this->faker->text(10),
                'description' => $this->faker->text(300),
                'quantity' => $this->faker->numberBetween(1,5),
                'city' => 'Kalisz',
                'start_date' => '2022-12-08 23:47:28',
                'end_date' => '2022-12-09 23:47:28',
                'user_id' => $user->id,
                'activity_id' => [$activity->id]
            ]
        ]);

        $this->withoutExceptionHandling();
        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);
    }

    public function test_can_edit_announcement()
    {

        $activity = Activity::create([
            'name' => 'Spacer',
        ]);
        $user = User::factory()->create();
        $this->actingAs($user);

        $announcement = Announcement::create([
            'title' => 'test',
            'description' => $this->faker->text(300),
            'quantity' => $this->faker->numberBetween(1,5),
            'city' => 'Kalisz',
            'start_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'end_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'user_id'=>$user->id,
        ]);

        $response = $this->postJson('api/announcements/updateAnnouncement', [
            'data' => [
                'title' => $this->faker->text(10),
                'description' => $this->faker->text(300),
                'quantity' => $this->faker->numberBetween(1,5),
                'city' => 'Kalisz',
                'start_date' => '2022-12-08 23:47:28',
                'end_date' => '2022-12-09 23:47:28',
                'user_id' => $user->id,
                'id' => $announcement->id,
                'activity_id' => [$activity->id]
            ]
        ]);

        $this->withoutExceptionHandling();
        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);

    }

    public function test_user_cant_modify_other_user_announcement()
    {

        $activity = Activity::create([
            'name' => 'Spacer',
        ]);
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $this->actingAs($user);

        $announcement = Announcement::create([
            'title' => 'test',
            'description' => $this->faker->text(300),
            'quantity' => $this->faker->numberBetween(1,5),
            'city' => 'Kalisz',
            'start_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'end_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'user_id'=>$user2->id,
        ]);

        $response = $this->postJson('api/announcements/updateAnnouncement', [
            'data' => [
                'title' => $this->faker->text(10),
                'description' => $this->faker->text(300),
                'quantity' => $this->faker->numberBetween(1,5),
                'city' => 'Kalisz',
                'start_date' => '2022-12-08 23:47:28',
                'end_date' => '2022-12-09 23:47:28',
                'user_id' => $user->id,
                'id' => $announcement->id,
                'activity_id' => [$activity->id]
            ]
        ]);

        $response->assertStatus(403);
    }

    public function test_user_can_delete_announcement()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $announcement = Announcement::create([
            'title' => 'test',
            'description' => $this->faker->text(300),
            'quantity' => $this->faker->numberBetween(1,5),
            'city' => 'Kalisz',
            'start_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'end_date' => $this->faker->dateTimeBetween('-5 days', '+60 days'),
            'user_id'=> $user->id,
        ]);

        $response = $this->deleteJson('api/announcements/deleteAnnouncement', [
            'id' => $announcement->id
        ]);

        $this->withoutExceptionHandling();
        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);
    }
}
