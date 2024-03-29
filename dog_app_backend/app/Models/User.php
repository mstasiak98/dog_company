<?php

namespace App\Models;

use Cmgmyr\Messenger\Traits\Messagable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, Messagable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'phone_number',
        'city',
        'street',
        'zip_code',
        'house_number',
        'flat_number',
        'description',
        'is_email_verified'
    ];



    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function photos() {
        return $this->morphMany(Photo::class, 'photoable');
    }

    public function dogProfiles() {
        return $this->hasMany(DogProfile::class);
    }

    public function dogCares() {
        return $this->hasMany(DogCare::class, 'guardian_id');
    }

    public function announcements() {
        return $this->hasMany(Announcement::class);
    }
}
