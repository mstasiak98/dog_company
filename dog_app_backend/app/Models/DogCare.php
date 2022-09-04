<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DogCare extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'additional_info',
        'siblings',
        'state_id',
        'activity_id',
        'dog_profile_id',
        'guardian_id',
        'announcement_id'
    ];

    protected $guarded = ['rating', 'comment'];

    public function activity() {
        return $this->belongsTo(Activity::class);
    }

    public function guardian() {
        return $this->belongsTo(User::class);
    }

    public function dogProfile() {
        return $this->belongsTo(DogProfile::class);
    }

    public function careState() {
        return $this->belongsTo(CareState::class);
    }
}
