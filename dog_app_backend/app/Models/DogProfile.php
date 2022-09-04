<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DogProfile extends Model
{

    use HasFactory;

    protected $fillable = [
        'name',
        'color',
        'visible',
        'description',
        'breed_id',
        'size_id',
        'user_id'
    ];

    public function size() {
        return $this->belongsTo(Size::class);
    }

    public function breed() {
        return $this->belongsTo(Breed::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function activities() {
        return $this->belongsToMany(Activity::class, 'activity_dog_profile', 'dog_profile_id', 'activity_id');
    }

    public function availabilities() {
        return $this->belongsToMany(Availability::class, 'availability_dog_profile', 'dog_profile_id', 'availability_id');
    }

    public function features() {
        return $this->belongsToMany(Feature::class, 'dog_profile_feature', 'dog_profile_id', 'feature_id');
    }

    public function photos() {
        return $this->morphMany(Photo::class, 'photoable');
    }

}
