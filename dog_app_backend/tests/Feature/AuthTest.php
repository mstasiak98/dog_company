<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_authenticate()
    {
        $user = User::factory()->create();

        $response = $this->postJson('api/login', [
            'email' => $user->email,
            'password' => 'password'
        ]);

        $this->assertAuthenticated();
    }

    public function test_user_cant_authenticate_with_wrong_password() {
        $user = User::factory()->create();

        $response = $this->postJson('api/login', [
            'email' => $user->email,
            'password' => 'wrong-password'
        ]);

        $this->assertGuest();
    }

    public function test_user_can_register() {

        Role::create(['name'=>config('app.user_role')]);
        $response = $this->postJson('api/register', [
            'data' => [
                'first_name' => $this->faker->firstName(),
                'last_name' => $this->faker->lastName(),
                'email' => $this->faker->unique()->safeEmail(),
                'phone_number' => '123 235 123',
                'city' => 'Kalisz',
                'street' => 'Bursztynowa',
                'zip_code' => '23-123',
                'flat_number' => '5a',
                'house_number' => '4',
                'email_verified_at' => now(),
                'password' => '12345678',
            ]
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true
            ]);
    }

}
