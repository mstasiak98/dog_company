<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    protected $fillable = [
        'name',
    ];

    public function dogProfiles() {
        return $this->belongsToMany(DogProfile::class, 'availability_dog_profile', 'availability_id', 'dog_profile_id');
    }
}
