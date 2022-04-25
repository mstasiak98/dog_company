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
            'first_name' => 'Test',
            'last_name' => 'Test',
            'phone_number' => '111111111',
            'city' => 'Kalisz',
            'street' => 'Kaliska',
            'zip_code' => '11-111',
            'house_number' => '4a',
            'email' => 'test@test.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        $userRole = Role::findByName(config('app.user_role'));
        if(isset($userRole)){
            $user->assignRole($userRole);
        }

        $user = User::create([
            'first_name' => 'Test',
            'last_name' => 'Test',
            'phone_number' => '222222222',
            'city' => 'Kalisz',
            'street' => 'Kaliska',
            'zip_code' => '11-111',
            'house_number' => '4a',
            'email' => 'admin@admin.com',
            'password' => Hash::make('12345678'),
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s'),
        ]);

        $adminRole = Role::findByName(config('app.admin_role'));
        if(isset($adminRole)){
            $user->assignRole($adminRole);
        }

    }
}
