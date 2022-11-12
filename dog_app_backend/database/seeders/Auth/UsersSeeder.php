<?php

namespace Database\Seeders\Auth;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            'first_name' => 'Andrzej',
            'last_name' => 'Nowak',
            'phone_number' => '312 233 231',
            'city' => 'Kalisz',
            'street' => 'Widok',
            'zip_code' => '62-800',
            'house_number' => '75a',
            'email' => 'test@test.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        $userRole = Role::findByName(config('app.user_role'));
        if(isset($userRole)){
            $user->assignRole($userRole);
        }

        $user = User::create([
            'first_name' => 'Mikolaj',
            'last_name' => 'Stasiak',
            'phone_number' => '123 887 212',
            'city' => 'Nowe Skalmierzyce',
            'street' => 'Kaliska',
            'zip_code' => '63-460',
            'house_number' => '12',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        $adminRole = Role::findByName(config('app.admin_role'));
        if(isset($adminRole)){
            $user->assignRole($adminRole);
        }

        User::factory()->count(40)->create();

    }
}
