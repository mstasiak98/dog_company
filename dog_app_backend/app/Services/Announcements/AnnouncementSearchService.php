<?php

namespace App\Services\Announcements;

use App\Models\Announcement;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;


class AnnouncementSearchService
{
    public function search(Request $request) {
        $city = $request->city;
        $activities = $request->activities;
        $quantity = $request->quantities;
        $start_date = $request->start_date;
        $end_date = $request->end_date;

        $sortMode = 'ASC';

        $sort = $request->sort;

        if($sort) {
            $sortMode = $sort == -1 ? 'ASC' : 'DESC';
        }

        // nie wyświetlaj starych ogłoszeń
        $announcements = Announcement::whereDate('end_date', '>=', Carbon::now());

        $announcements->where('city', 'like', '%'.$city.'%');
        if($quantity && count($quantity)==1){
            if($quantity[0] == 0)
                $announcements->where('quantity', '=', 1);
            else
                $announcements->where('quantity', '>', 1);
        }
        if($start_date){
            $announcements->whereDate('start_date', '>=', Carbon::createFromFormat('Y-m-d H:i:s', $start_date));
        }
        if($end_date){
            $announcements->whereDate('end_date', '<=', Carbon::createFromFormat('Y-m-d H:i:s', $end_date));
        }
        $announcements->whereHas('activities', function (Builder $query) use ($activities){
            if (!is_null($activities) ){
                $query->whereIn('activities.id', (array) $activities );
            }
        });

        return $announcements->orderBy('start_date', $sortMode)->paginate(config('app.default_announcements_page_size'))->withQueryString();
    }
}
