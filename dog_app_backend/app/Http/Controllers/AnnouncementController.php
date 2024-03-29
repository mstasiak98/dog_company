<?php

namespace App\Http\Controllers;

use App\Helpers\AuthorizationHelper;
use App\Http\Requests\Announcement\StoreAnnouncementRequest;
use App\Http\Requests\Announcement\UpdateAnnouncementRequest;
use App\Http\Requests\Photo\ReplacePhotoRequest;
use App\Http\Resources\AnnouncmentCollection;
use App\Http\Resources\AnnouncmentResource;
use App\Models\Announcement;
use App\Services\Announcements\AnnouncementSearchService;
use App\Services\PhotoService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class AnnouncementController extends Controller
{

    public function index(Request $request, AnnouncementSearchService $announcementSearchService){
        $announcements = new AnnouncmentCollection($announcementSearchService->search($request));
        return response()->json($announcements->response()->getData());
    }

    public function details(Request $request) {
        return response()->json(
            new AnnouncmentResource(Announcement::findOrFail($request->announcementId))
        );
    }

    public function edit(Request $request) {
        $announcement = Announcement::findOrFail($request->announcementId);
        AuthorizationHelper::checkAuthorization($announcement,'edit');
        return response()->json(new AnnouncmentResource($announcement));
    }

    public function userAnnouncements() {
        $announcements = Announcement::where('user_id', auth()->user()->id)->orderBy('created_at', 'DESC')->paginate(config('app.default_announcements_page_size'))->withQueryString();
        $announcementsCollection = new AnnouncmentCollection($announcements);
        return response()->json($announcementsCollection->response()->getData());
    }

    public function store(StoreAnnouncementRequest $request, PhotoService $photoService) {

        try {
            $photo = null;
            if($request->hasFile('photo')) {
                $photo = $photoService->savePhotoOnDisk($request->file('photo'));
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

    public function update(UpdateAnnouncementRequest $request) {

        $announcement = Announcement::findOrFail($request->id);
        AuthorizationHelper::checkAuthorization($announcement, 'update');

        DB::transaction(function () use ($request, $announcement){
            $announcement->fill($request->all())->save();
            $announcementActivities = $request->input('activity_id', []);
            $announcement->activities()->sync($announcementActivities);
        });
        return response()->json(['success' => true, 'announcementId' => $request->id, 'title' => $request->title]);

    }

    public function destroy(Request $request) {
        $announcement = Announcement::findOrFail($request->id);

        AuthorizationHelper::checkAuthorization($announcement, 'destroy');

        DB::transaction(function () use ($request, $announcement){
            $announcement->delete();
            $announcement->photos()->delete();
            $announcement->activities()->detach();
        });

        return response()->json(['success' => true]);
    }

    public function replacePhoto(ReplacePhotoRequest $request, PhotoService $photoService) {
        $res = $photoService->replacePhoto($request);

        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Wystąpił błąd podczas zmiany zdjęcia.'
        ], Response::HTTP_BAD_REQUEST));
    }
}
