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


    public function getDogProfileFilters() {
        $sizeCollection = SizeResource::collection(Size::all());
        $featureCollection = FeatureResource::collection(Feature::all());
        $activityCollection = ActivityResource::collection(Activity::all());
        $availabilityCollection = AvailabilityResource::collection(Availability::all());
        $breedCollection = BreedResource::collection(Breed::all());

        $filters = [
            'sizes' => $sizeCollection,
            'features' => $featureCollection,
            'activities' => $activityCollection,
            'availabilities' => $availabilityCollection,
            'breeds' => $breedCollection
        ];

        return response()->json($filters);
    }
}
