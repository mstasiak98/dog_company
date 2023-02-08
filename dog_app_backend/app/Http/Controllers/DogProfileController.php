<?php

namespace App\Http\Controllers;

use App\Helpers\AuthorizationHelper;
use App\Http\Requests\DogProfile\ChangeVisibilityRequest;
use App\Http\Requests\DogProfile\StoreDogProfileRequest;
use App\Http\Requests\DogProfile\UpdateDogProfileRequest;
use App\Http\Resources\DogDetailsResource;
use App\Http\Resources\DogProfileCollection;
use App\Http\Resources\DogProfileResource;
use App\Http\Resources\OwnerResource;
use App\Models\DogProfile;
use App\Services\DogProfile\DogProfileSearchService;
use App\Services\PhotoService;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DogProfileController extends Controller
{
    public function index(Request $request, DogProfileSearchService $dogProfileSearchService){
        $dogResourceCollection = new DogProfileCollection($dogProfileSearchService->search($request));
        return response()->json($dogResourceCollection->response()->getData());
    }

    public function details(Request $request) {
        $dog = DogProfile::where('id', '=', $request->dogProfileId)->where('visible', '=', 1)->firstOrFail();
        return response()->json($this->getDogProfileData($dog));
    }

    public function edit(Request $request) {
        $dog = DogProfile::findOrFail($request->dogProfileId);
        AuthorizationHelper::checkAuthorization($dog, 'edit');
        return response()->json($this->getDogProfileData($dog));
    }

    public function userDogProfiles(Request $request) {
        $dogProfilesCollection = DogProfileResource::collection(DogProfile::where('user_id', auth()->user()->id)->get());
        return response()->json($dogProfilesCollection);
    }

    public function store(StoreDogProfileRequest $request, PhotoService $photoService) {

        try {
            $filePaths = null;
            if ($request->hasFile('photo')) {
                $filePaths = $photoService->savePhotosOnDisk($request);
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
                    $photoService->storePhotosInDB($filePaths, $dogProfile);
                }
                return $dogProfile->id;
            });

        }catch (\Exception $e) {
            if(!is_null($filePaths)) {
                $photoService->revertSavePhotosOnDisk($filePaths);
            }
            return response()->json(['success' => false, 'error' => $e]);
        }
        return response()->json(['success' => true, 'dogProfileId'=>$dogProfileId, 'name' => $request->name]);
    }

    public function update(UpdateDogProfileRequest $request) {

        $dogProfile = DogProfile::findOrFail($request->id);

        AuthorizationHelper::checkAuthorization($dogProfile, 'update');

        DB::transaction(function () use ($request, $dogProfile){
            $dogProfile->fill($request->all())->save();
            $dogProfileActivities = $request->input('activities', []);
            $dogProfileAvailabilities = $request->input('availabilities', []);
            $dogProfileFeatures = $request->input('features', []);
            $dogProfile->activities()->sync($dogProfileActivities);
            $dogProfile->availabilities()->sync($dogProfileAvailabilities);
            $dogProfile->features()->sync($dogProfileFeatures);
        });

        return response()->json(['success' => true, 'announcementId' => $request->id, 'title' => $request->title]);
    }

    public function destroy(Request $request) {

        $dogProfile = DogProfile::findOrFail($request->id);

        AuthorizationHelper::checkAuthorization($dogProfile, 'destroy');

        DB::transaction(function () use ($request, $dogProfile){
            $dogProfile->delete();
            $dogProfile->photos()->delete();
            $dogProfile->activities()->detach();
            $dogProfile->availabilities()->detach();
            $dogProfile->features()->detach();
        });

        return response()->json(['success' => true]);
    }

    public function changeVisibility(ChangeVisibilityRequest $request) {
        $dogProfile = DogProfile::find($request->id);

        AuthorizationHelper::checkAuthorization($dogProfile, 'changeVisibility');

        $dogProfile->visible = $request->visible;
        $dogProfile->save();

        return response()->json(['success' => true]);

    }

    private function getDogProfileData(DogProfile $dogProfile): array {
        $dogResource = new DogProfileResource($dogProfile);
        $owner = new OwnerResource($dogProfile->user);
        $siblings = DogProfile::where('user_id', '=', $owner->id)->where('id', '!=', $dogProfile->id)->get();

        $response = [
            'dog' => $dogResource,
            'owner' => $owner,
            'siblings' => $siblings
        ];
        return $response;
    }

}
