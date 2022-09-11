<?php

namespace App\Services\DogCares;

use App\Http\Requests\DogCare\GetDogCareRequest;
use App\Models\DogCare;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;


class DogCareService
{

    public function getDogCares(GetDogCareRequest $request) {

        //wyciągam odrzucone - (odrzucone przez wlasciciela oraz anulowane przez opiekuna)
        if($request->care_state_id == 3 || $request->care_state_id == 5) {
            $dogCares = DogCare::whereIn('state_id', [3,5]);
        }else {
            $dogCares = DogCare::where('state_id', '=', $request->care_state_id);
        }

        if(!$request->is_owner) {
            $dogCares->where('guardian_id', '=', $request->user_id);
        } else {
            $dogCares->whereHas('dogProfile', function (Builder $query) use ($request) {
                $query->where('user_id', '=', $request->user_id);
            });
        }

        //zaakceptowane(nadchodzące) opieki wyciągam bez paginacji
        if($request->care_state_id == 2) {
            return $dogCares->get();
        }

        return $dogCares->paginate(config('app.default_announcements_page_size'))->withQueryString();
    }


}
