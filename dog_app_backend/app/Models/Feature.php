<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{

    protected $fillable = [
        'name',
    ];

    public function dogProfiles() {
        return $this->belongsToMany(DogProfile::class, 'dog_profile_feature', 'feature_id', 'dog_profile_id');
    }
}
