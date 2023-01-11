<?php

namespace App\Http\Controllers;

use App\Enums\CareStateEnum;
use App\Http\Requests\DogCare\DogCareAnnouncementRequest;
use App\Http\Requests\DogCare\DogCareRequest;
use App\Http\Requests\DogCare\DogCaresRateRequest;
use App\Http\Requests\DogCare\DogCareStatusRequest;
use App\Http\Requests\DogCare\GetDogCareRequest;
use App\Http\Resources\DogCareCollection;
use App\Models\Activity;
use App\Models\Announcement;
use App\Models\DogCare;
use App\Models\DogProfile;
use App\Models\User;
use App\Notifications\AnnouncementAccepted;
use App\Notifications\DogCareAccepted;
use App\Notifications\DogCareProposed;
use App\Services\DogCares\DogCareService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;


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


        Notification::send($dogCare->dogProfile->user, new DogCareProposed($dogCare));
        return response()->json(['success' => true, 'start_date' => $dogCare->start_date]);
    }

    public function storeAnnouncementProposal(DogCareAnnouncementRequest $request) {
        $announcement = Announcement::where('id', $request->announcement_id)->first();

        $dogCare = DogCare::create([
            'start_date' => $announcement->start_date,
            'end_date' => $announcement->end_date,
            'additional_info' => $request->additional_info ?? null,
            'siblings' => null,
            'activity_id' => $request->activity_id,
            'guardian_id' => auth()->user()->id,
            'state_id' => 1,
            'announcement_id' => $announcement->id
        ]);

        Notification::send($announcement->user, new AnnouncementAccepted($dogCare));
        return response()->json(['success' => true, 'start_date' => $dogCare->start_date]);
    }

    public function getDogCares(GetDogCareRequest $request, DogCareService $dogCareService) {
        $dogCareCollection = new DogCareCollection($dogCareService->getDogCares($request));
        return response()->json($dogCareCollection->response()->getData());
    }

    public function accept(DogCareStatusRequest $request, DogCareService $dogCareService) {
        $res = $dogCareService->acceptDogCare($request->dogCareId);
        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Błąd podczas akceptacji opieki'
        ], Response::HTTP_BAD_REQUEST));
    }

    public function reject(DogCareStatusRequest $request, DogCareService $dogCareService) {
        $res = $dogCareService->cancelDogCare($request->dogCareId, CareStateEnum::OWNER_REJECTED);
        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Błąd podczas odrzucania opieki'
        ], Response::HTTP_BAD_REQUEST));
    }

    public function cancel(DogCareStatusRequest $request, DogCareService $dogCareService) {
        $res = $dogCareService->cancelDogCare($request->dogCareId, CareStateEnum::CANCELLED);
        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Błąd podczas anulowania opieki'
        ], Response::HTTP_BAD_REQUEST));
    }

    public function rate(DogCaresRateRequest $request, DogCareService $dogCareService) {
        $res = $dogCareService->rateCare($request);
        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Błąd podczas wystawiania oceny'
        ], Response::HTTP_BAD_REQUEST));
    }
}
