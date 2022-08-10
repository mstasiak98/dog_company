<?php

namespace App\Http\Controllers;

use App\Http\Requests\DogCare\DogCareAnnouncementRequest;
use App\Http\Requests\DogCare\DogCareRequest;
use App\Models\DogCare;

class DogCareController extends Controller
{
    public function storeProposal(DogCareRequest $request) {

        $dogCare = DogCare::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'additional_info' => $request->additional_info,
            'siblings' => $request->siblings,
            'activity_id' => $request->activity_id,
            'dog_profile_id' => $request->dog_profile_id,
            'guardian_id' => auth()->user()->id,
            'state_id' => 1
        ]);

        return response()->json(['success' => true, 'start_date' => $dogCare->start_date]);
    }

    public function storeAnnouncementProposal(DogCareAnnouncementRequest $request) {

        $dogCare = DogCare::create([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'additional_info' => $request->additional_info,
            'siblings' => $request->siblings,
            'activity_id' => $request->activity_id,
            'guardian_id' => auth()->user()->id,
            'state_id' => 1,
            'announcement_id' => $request->announcement_id
        ]);

        return response()->json(['success' => true, 'start_date' => $dogCare->start_date]);
    }

}
