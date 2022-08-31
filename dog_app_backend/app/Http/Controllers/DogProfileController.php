<?php

namespace App\Http\Controllers;

use App\Http\Requests\DogProfile\StoreDogProfileRequest;
use App\Http\Resources\DogDetailsResource;
use App\Http\Resources\DogProfileCollection;
use App\Http\Resources\DogProfileResource;
use App\Http\Resources\OwnerResource;
use App\Models\DogProfile;
use App\Services\PhotoService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DogProfileController extends Controller
{
    public function index(Request $request){

        $activities = $request->activities;
        $availabilities = $request->availabilities;
        $sizes = $request->sizes;
        $breeds = $request->breeds;
        $features = $request->features;

        if(is_null($activities) && is_null($availabilities) && is_null($sizes) && is_null($breeds) && is_null($features)){
            $dogResourceCollection = new DogProfileCollection(DogProfile::where('visible', '=', 1)->paginate(config('app.default_page_size'))->withQueryString());
            return response()->json($dogResourceCollection->response()->getData());
        }

        $dogs = DogProfile::whereHas('activities', function (Builder $query) use ($activities){
            if (!is_null($activities)){
                $query->whereIn('activities.id', (array) $activities );
            }
        })->whereHas('breed', function (Builder $query) use ($breeds) {
            if (!is_null($breeds)){
                $query->whereIn('breeds.id', (array) $breeds);
            }
        })->whereHas('size', function (Builder $query) use ($sizes) {
            if (!is_null($sizes)){
                $query->whereIn('sizes.id', (array) ($sizes));
            }
        })->whereHas('features', function (Builder $query) use ($features) {
            if (!is_null($features)) {
                $query->whereIn('features.id', (array) $features);
            }
        })->whereHas('availabilities', function (Builder $query) use ($availabilities) {
            if (!is_null($availabilities)) {
                $query->whereIn('availabilities.id', (array) $availabilities);
            }
        })->where('visible', '=', 1)->paginate(config('app.default_page_size'))->withQueryString();


        $dogResourceCollection = new DogProfileCollection($dogs);
        return response()->json($dogResourceCollection->response()->getData());
    }

    public function details(Request $request){
        $dog = DogProfile::findOrFail($request->dogProfileId);
        $dogResource = new DogProfileResource($dog);
        $owner = new OwnerResource($dog->user);
        $siblings = DogProfile::where('user_id', '=', $owner->id)->where('id', '!=', $dog->id)->get();

        $response = [
            'dog' => $dogResource,
            'owner' => $owner,
            'siblings' => $siblings
        ];

        return response()->json($response);
    }

    public function userDogProfiles(Request $request) {
        $dogProfilesCollection = DogProfileResource::collection(DogProfile::where('user_id', auth()->user()->id)->get());
        return response()->json($dogProfilesCollection);
    }

    public function store(StoreDogProfileRequest $request, PhotoService $photoService) {

        try {
            $filePaths = null;
            if ($request->hasFile('photo')) {
                $filePaths = $photoService->storePhotos($request);
                if($filePaths === false || count($filePaths) === 0){
                    return response()->json(['success' => false, 'error' => 'Wystąpił problem podczas zapisywania zdjęć.']);
                }
            }

            $dogProfileId = DB::transaction(function () use ($request, $filePaths, $photoService){
                $dogProfile = DogProfile::create([
                    'name' => $request->name,
                    'color' => $request->color,
                    'visible' => true,
                    'description' => $request->description,
                    'breed_id' => $request->breed_id,
                    'size_id' => $request->size_id,
                    'user_id' => auth()->user()->id
                ]);
                $dogProfileActivities = $request->input('activities', []);
                $dogProfileAvailabilities = $request->input('availabilities', []);
                $dogProfileFeatures = $request->input('features', []);
                $dogProfile->activities()->sync($dogProfileActivities);
                $dogProfile->availabilities()->sync($dogProfileAvailabilities);
                $dogProfile->features()->sync($dogProfileFeatures);

                if(!is_null($filePaths)) {
                    $photoService->storePhotosInBD($filePaths, $dogProfile);
                }
                return $dogProfile->id;
            });

        }catch (\Exception $e) {
            if(!is_null($filePaths)) {
                $photoService->revertSaveFile($filePaths);
            }
            return response()->json(['success' => false, 'error' => $e]);
        }
        return response()->json(['success' => true, 'dogProfileId'=>$dogProfileId, 'name' => $request->name]);
    }

}
