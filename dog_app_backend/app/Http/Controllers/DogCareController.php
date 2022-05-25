<?php

namespace App\Http\Controllers;

use App\Http\Requests\DogCareRequest;
use App\Models\DogCare;
use App\Models\DogProfile;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

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
}
