<?php

namespace Tests\Feature;

use App\Models\Activity;
use App\Models\Breed;
use App\Models\CareState;
use App\Models\DogCare;
use App\Models\DogProfile;
use App\Models\Size;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class DogCareTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_make_care_proposal()
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

        $care_state = CareState::create([
            'name' => 'Zaproponowana'
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

        DB::table('activity_dog_profile')->insert([
            'dog_profile_id' => $dogProfile->id,
            'activity_id' => $activity->id
        ]);


        $user2 = User::factory()->create();
        $this->actingAs($user2);


        $response = $this->postJson('api/makeProposal', [
            'start_date' => '2023-10-05 18:00:00',
            'end_date' => '2023-10-05 19:00:00',
            'activity_id' => $activity->id,
            'additional_info' => 'brak',
            'siblings' => true,
            'dog_profile_id' => $dogProfile->id,
            'announcement_id' => null,
        ]);

        $this->withoutExceptionHandling();
        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);

    }

    public function test_user_cant_make_care_proposal_for_past_date()
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

        $care_state = CareState::create([
            'name' => 'Zaproponowana'
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

        DB::table('activity_dog_profile')->insert([
            'dog_profile_id' => $dogProfile->id,
            'activity_id' => $activity->id
        ]);


        $user2 = User::factory()->create();
        $this->actingAs($user2);


        $response = $this->postJson('api/makeProposal', [
            'start_date' => '2021-10-06 18:00:00',
            'end_date' => '2021-10-06 19:00:00',
            'activity_id' => $activity->id,
            'additional_info' => 'brak',
            'siblings' => true,
            'dog_profile_id' => $dogProfile->id,
            'announcement_id' => null,
        ]);

        $this->withoutExceptionHandling();
        $response->assertStatus(422)
           ->assertJson(fn (AssertableJson $json) =>
           $json->has('errors')
           ->etc()
           );
    }

    public function test_user_can_accept_proposal()
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

        $care_state = CareState::create([
            'name' => 'Zaproponowana'
        ]);

        $care_state2 = CareState::create([
            'name' => 'Zaakceptowana'
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

        DB::table('activity_dog_profile')->insert([
            'dog_profile_id' => $dogProfile->id,
            'activity_id' => $activity->id
        ]);

        $user2 = User::factory()->create();
        $dogCare = DogCare::create([
            'start_date' => '2023-10-05 18:00:00',
            'end_date' => '2023-10-06 18:00:00',
            'guardian_id' => $user2->id,
            'activity_id' => $activity->id,
            'state_id' => $care_state->id,
            'dog_profile_id' => $dogProfile->id
        ]);

        $this->actingAs($user);
        $response = $this->patchJson('api/dogCares/accept', [
            'dogCareId' => $dogCare->id
        ]);


        $this->withoutExceptionHandling();
        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);
    }

    public function test_user_cant_accept_not_his_proposal()
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

        $care_state = CareState::create([
            'name' => 'Zaproponowana'
        ]);

        $care_state2 = CareState::create([
            'name' => 'Zaakceptowana'
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

        DB::table('activity_dog_profile')->insert([
            'dog_profile_id' => $dogProfile->id,
            'activity_id' => $activity->id
        ]);

        $user2 = User::factory()->create();
        $dogCare = DogCare::create([
            'start_date' => '2023-10-05 18:00:00',
            'end_date' => '2023-10-06 18:00:00',
            'guardian_id' => $user2->id,
            'activity_id' => $activity->id,
            'state_id' => $care_state->id,
            'dog_profile_id' => $dogProfile->id
        ]);

        $this->actingAs($user2);
        $response = $this->patchJson('api/dogCares/accept', [
            'dogCareId' => $dogCare->id
        ]);


        $this->withoutExceptionHandling();
        $response->assertStatus(401);
    }

}
