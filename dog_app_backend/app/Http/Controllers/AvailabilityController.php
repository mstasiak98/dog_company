<?php

namespace App\Http\Controllers;

use App\Http\Resources\AvailabilityResource;
use App\Models\Availability;
use Illuminate\Http\Request;

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
