<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Breed extends Model
{

    protected $fillable = [
        'name',
    ];

    public function dogProfiles() {
        return $this->hasMany(DogProfile::class);
    }
}
