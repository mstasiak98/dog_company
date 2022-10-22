<?php

namespace App\Models;

use App\Enums\CareStateEnum;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
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
        return $this->belongsTo(User::class, 'guardian_id');
    }

    public function dogProfile() {
        return $this->belongsTo(DogProfile::class);
    }

    public function announcement() {
        return $this->belongsTo(Announcement::class);
    }

    public function careState() {
        return $this->belongsTo(CareState::class, 'state_id');
    }

    // check if there is any accepted dog_care overlaping this dog care for owner of dog in this dog care
    public function datesOverlap() {
        $userId = $this->dogProfile->user_id;
        $countOverlaping = DogCare::where('state_id', CareStateEnum::OWNER_ACCEPTED->value)
            ->whereHas('dogProfile', function (Builder $query) use ($userId) {
                $query->where('user_id', '=', $userId);
            })
            ->whereDate('start_date', '<=', Carbon::createFromFormat('Y-m-d H:i:s', $this->end_date))
            ->whereDate('end_date', '>=', Carbon::createFromFormat('Y-m-d H:i:s', $this->start_date))
            ->count();

        if($countOverlaping > 0) {
            return true;
        }

        return false;
    }
}
