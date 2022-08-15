<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnnouncementRequest;
use App\Http\Resources\AnnouncmentCollection;
use App\Http\Resources\AnnouncmentResource;
use App\Models\Announcement;
use App\Models\Photo;
use App\Models\User;
use App\Services\Announcements\AnnouncementSearchService;
use App\Services\PhotoService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Spatie\Permission\Models\Role;

class AnnouncementController extends Controller
{

    public function index(Request $request, AnnouncementSearchService $announcementSearchService){
        /*$act = $announcementSearchService->search($request);
        return response()->json($act);*/
        $announcements = new AnnouncmentCollection($announcementSearchService->search($request));
        return response()->json($announcements->response()->getData());
    }

    public function details(Request $request) {
        $dogResourceCollection = new AnnouncmentResource(Announcement::findOrFail($request->announcementId));
        return response()->json($dogResourceCollection);
    }

    public function store(AnnouncementRequest $request, PhotoService $photoService) {

        try {
            $photo = null;
            if($request->hasFile('photo')) {
                $photo = $photoService->storePhotoOnDisk($request->file('photo'));
                if(!is_string($photo)){
                    return response()->json(['success' => false, 'error' => 'Wystąpił problem podczas dodawania ogłoszenia']);
                }
            }

            $announcementId = DB::transaction(function () use ($request, $photo, $photoService){
                $announcement = Announcement::create($request->all());
                $announcementActivities = $request->input('activity_id', []);
                $announcement->activities()->sync($announcementActivities);
                if(is_string($photo)) {
                    $photoService->storePhotoInDB($photo, $announcement);
                }
                return $announcement->id;
            });

        } catch (\Exception $e) {
            if(is_string($photo)) {
                Storage::delete($photo);
            }
            return response()->json(['success' => false, 'error' => $e]);
        }
        return response()->json(['success' => true, 'announcementId'=>$announcementId, 'title' => $request->title]);
    }

    public function update(AnnouncementRequest $request) {
        try {
            $announcement = Announcement::findOrFail($request->id);
            DB::transaction(function () use ($request, $announcement){
                $announcement->fill($request->all())->save();
                $announcementActivities = $request->input('activity_id', []);
                $announcement->activities()->sync($announcementActivities);
            });
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'error' => $e]);
        }
        return response()->json(['success' => true, 'announcementId' => $request->id, 'title' => $request->title]);
    }

    public function destroy(Request $request) {
        try {
            $announcement = Announcement::findOrFail($request->id);
            DB::transaction(function () use ($request, $announcement){
                $announcement->delete();
                $announcement->photos()->delete();
                $announcement->activities()->detach();
            });
        } catch (\Exception $e) {

            return response()->json(['success' => false, 'error' => $e->getMessage()]);
        }
        return response()->json(['success' => true]);

    }

    /*public function update(AnnouncementRequest $request, PhotoService $photoService) {
        $oldPhoto = Photo::find($request->photo_id);
        $filename = $oldPhoto ? $oldPhoto->filename : null;
        $isDeletePhoto = $request->is_delete_photo;
        if($filename) {
            $oldFile = Storage::get($filename);
        }

        try {
            $photo = null;
            if($request->hasFile('photo') || !is_null($filename)) {
                $photo = $photoService->handlePhotoStorageReplace($request->file('photo'), $filename, $isDeletePhoto);
            }
            if($photo === false) {
                return response()->json(['success' => false, 'error' => 'Wystąpił problem podczas edycji ogłoszenia']);
            }

            $announcement = Announcement::findOrFail($request->id);
            DB::transaction(function () use ($request, $photo, $photoService, $announcement, $oldPhoto){
                $announcement->fill($request->all())->save();
                $announcementActivities = $request->input('activity_id', []);
                $announcement->activities()->sync($announcementActivities);
                if(!is_null($photo)){
                    $photoService->handlePhotoDbReplace($photo, $announcement, $oldPhoto);
                }
            });

        } catch (\Exception $e) {
            if(is_string($photo) && is_null($filename)) {
                Storage::delete($photo);
            }

            if(is_string($photo) && !is_null($filename)) {
                Storage::delete($photo);
                $oldFile->store('photos');
            }

            if($isDeletePhoto) {
                $oldFile->store('photos');
            }

            return response()->json(['success' => false, 'error' => $e]);
        }
        return response()->json(['success' => true, 'title' => $oldFile]);
    }*/


}
