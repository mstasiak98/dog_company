<?php

namespace App\Providers;

use App\Models\Announcement;
use App\Models\DogProfile;
use App\Models\Photo;
use App\Models\User;
use App\Policies\AnnouncementPolicy;
use App\Policies\DogProfilePolicy;
use App\Policies\PhotoPolicy;
use App\Policies\ThreadPolicy;
use App\Policies\UserPolicy;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Announcement::class => AnnouncementPolicy::class,
        Thread::class => ThreadPolicy::class,
        DogProfile::class => DogProfilePolicy::class,
        Photo::class => PhotoPolicy::class,
        User::class => UserPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
