<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'quantity',
        'city',
        'start_date',
        'end_date',
        'user_id'
    ];


    public function photos() {
        return $this->morphMany(Photo::class, 'photoable');
    }

    public function activities() {
        return $this->belongsToMany(Activity::class, 'activity_announcement', 'announcement_id', 'activity_id');
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

}
