<?php

namespace App\Services\DogCares;

use App\Http\Requests\DogCare\GetDogCareRequest;
use App\Models\DogCare;
use Illuminate\Database\Eloquent\Builder;

class DogCareService
{

    public function getDogCares(GetDogCareRequest $request) {

        $dogCares = DogCare::where('state_id', '=', $request->care_state_id);

        if($request->has('guardian_id') && !is_null($request->guardian_id)) {
            $dogCares->where('guardian_id', '=', $request->guardian_id);
        }

        if($request->has('owner_id') && !is_null($request->owner_id)) {
            $dogCares = DogCare::whereHas('dogProfile', function (Builder $query) use ($request) {
                $query->where('user_id', '=', $request->owner_id);
            });

        }

        return $dogCares->paginate(config('app.default_announcements_page_size'))->withQueryString();
    }

}
