<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{

    protected $fillable = [
        'name',
    ];


    public function dogProfiles() {
        return $this->belongsToMany(DogProfile::class, 'activity_dog_profile', 'activity_id', 'dog_profile_id');
    }

    public function announcements() {
        return $this->belongsToMany(Announcement::class, 'activity_announcement', 'activity_id', 'announcement_id');
    }

}
