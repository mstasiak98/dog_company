<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];

    public function dogProfiles() {
        return $this->hasMany(DogProfile::class);
    }

}
