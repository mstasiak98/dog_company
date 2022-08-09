<?php

namespace App\Http\Controllers;

use App\Http\Resources\AnnouncmentCollection;
use App\Http\Resources\AnnouncmentResource;
use App\Models\Announcement;
use App\Services\Announcements\AnnouncementSearchService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AnnouncementController extends Controller
{

    public function index(Request $request, AnnouncementSearchService $announcementSearchService){
        $announcements = new AnnouncmentCollection($announcementSearchService->search($request));
        return response()->json($announcements->response()->getData());
    }

    public function details(Request $request) {
        $dogResourceCollection = new AnnouncmentResource(Announcement::findOrFail($request->announcementId));
        return response()->json($dogResourceCollection);
    }


}
