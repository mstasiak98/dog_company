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
            'name' => 'Test',
            'email' => 'test@test.com',
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'password' => Hash::make('test')
        ]);

        $userRole = Role::findByName(config('app.user_role'));
        if(isset($userRole)){
            $user->assignRole($userRole);
        }

        $user = User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'password' => Hash::make('admin')
        ]);

        $adminRole = Role::findByName(config('app.admin_role'));
        if(isset($adminRole)){
            $user->assignRole($adminRole);
        }

    }
}
