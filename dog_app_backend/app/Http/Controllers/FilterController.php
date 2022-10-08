<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Http\Resources\AvailabilityResource;
use App\Http\Resources\BreedResource;
use App\Http\Resources\FeatureResource;
use App\Http\Resources\FilterResource;
use App\Http\Resources\SizeResource;
use App\Models\Activity;
use App\Models\Availability;
use App\Models\Breed;
use App\Models\Feature;
use App\Models\Size;
use Illuminate\Http\Request;

class FilterController extends Controller
{

    /**
     * Zwróć listę wszystkich filtrów.
     */
    public function getDogProfileFilters() {

        $filters = [
            'sizes' => SizeResource::collection(Size::all()),
            'features' => FeatureResource::collection(Feature::all()),
            'activities' => ActivityResource::collection(Activity::all()),
            'availabilities' => AvailabilityResource::collection(Availability::all()),
            'breeds' => BreedResource::collection(Breed::all())
        ];

        return response()->json($filters);
    }
}
