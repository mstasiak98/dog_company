<?php

namespace App\Http\Controllers;

use App\Http\Resources\AvailabilityResource;
use App\Models\Availability;
use App\Models\DogCare;
use App\Models\User;
use App\Notifications\DogCareAccepted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AvailabilityController extends Controller
{
    /**
     * Zwróć listę "dostępności".

     */
    public function index()
    {
        $availabilityCollection = AvailabilityResource::collection(Availability::all());
        return response()->json($availabilityCollection);
    }

}
