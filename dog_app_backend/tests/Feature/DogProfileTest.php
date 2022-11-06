<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Announcement;
use App\Models\Availability;
use App\Models\Breed;
use App\Models\DogProfile;
use App\Models\Feature;
use App\Models\Size;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class DogProfileTest extends TestCase
{

    use RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_get_dog_profiles()
    {

        $response = $this->getJson('api/dogs');
        $response->assertStatus(200)
            ->assertJson(fn (AssertableJson $json) =>
            $json->has('data')
                ->etc()
            );
    }

    public function test_get_dog_profile_details()
    {

        $user = User::factory()->create();
        $breed = Breed::create([
            'name' => 'Owczarek'
        ]);
        $size = Size::create([
            'name' => 'Mały',
            'description' => '2-5kg'
        ]);

        $dogProfile = DogProfile::create([
            'name' => 'Imie psa',
            'color' => 'Czarny',
            'visible' => 1,
            'description' => 'Testowy opis',
            'user_id' => $user->id,
            'breed_id' => $breed->id,
            'size_id' => $size->id,
        ]);

        $this->withoutExceptionHandling();
        $response = $this->getJson('api/dogDetails?dogProfileId='.$dogProfile->id);

        $response->assertStatus(200)
            ->assertJsonPath('dog.id', $dogProfile->id);
    }

    public function test_user_can_create_dog_profile()
    {
        $user = User::factory()->create();
        $breed = Breed::create([
            'name' => 'Owczarek'
        ]);
        $size = Size::create([
            'name' => 'Mały',
            'description' => '2-5kg'
        ]);
        $activity = Activity::create([
            'name' => 'Spacer',
        ]);
        $feature = Feature::create([
            'name' => 'Przyjazny'
        ]);

        $availability = Availability::create([
            'name' => 'Tydzień - do południa',
        ]);

        $this->actingAs($user);

        $response = $this->postJson('api/dogs/store', [
            'data' => [
                'name' => 'Imie psa',
                'color' => 'Czarny',
                'description' => 'Testowy opis',
                'breed_id' => $breed->id,
                'size_id' => $size->id,
                'activities' => [$activity->id],
                'features' => [$feature->id],
                'availabilities' => [$availability->id],
            ]
        ]);

        $this->withoutExceptionHandling();
        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);
    }

    public function test_owner_can_change_dog_visibility()
    {
        $user = User::factory()->create();
        $breed = Breed::create([
            'name' => 'Owczarek'
        ]);
        $size = Size::create([
            'name' => 'Mały',
            'description' => '2-5kg'
        ]);

        $this->actingAs($user);

        $dogProfile = DogProfile::create([
            'name' => 'Imie psa',
            'color' => 'Czarny',
            'visible' => 1,
            'description' => 'Testowy opis',
            'user_id' => $user->id,
            'breed_id' => $breed->id,
            'size_id' => $size->id,
        ]);

        $response = $this->patchJson('api/dogs/changeVisibility', [
            'id' => $dogProfile->id,
            'visible' => 1
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);
    }

    public function test_user_cant_change_someones_dog_visibility()
    {
        $user = User::factory()->create();
        $user2 = User::factory()->create();
        $breed = Breed::create([
            'name' => 'Owczarek'
        ]);
        $size = Size::create([
            'name' => 'Mały',
            'description' => '2-5kg'
        ]);

        $this->actingAs($user2);

        $dogProfile = DogProfile::create([
            'name' => 'Imie psa',
            'color' => 'Czarny',
            'visible' => 1,
            'description' => 'Testowy opis',
            'user_id' => $user->id,
            'breed_id' => $breed->id,
            'size_id' => $size->id,
        ]);

        $response = $this->patchJson('api/dogs/changeVisibility', [
            'id' => $dogProfile->id,
            'visible' => 1
        ]);

        $response->assertStatus(403);
    }


}
