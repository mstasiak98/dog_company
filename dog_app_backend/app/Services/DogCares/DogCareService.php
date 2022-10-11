<?php

namespace App\Services\DogCares;

use App\Enums\CareStateEnum;
use App\Http\Requests\DogCare\GetDogCareRequest;
use App\Models\DogCare;
use App\Notifications\DogCareAccepted;
use App\Notifications\DogCareCancelled;
use App\Notifications\DogCareRejected;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\HttpFoundation\Response;


class DogCareService
{

    public function getDogCares(GetDogCareRequest $request) {

        //wyciągam odrzucone - (odrzucone przez wlasciciela oraz anulowane przez opiekuna)
        if(
            $request->care_state_id == CareStateEnum::OWNER_REJECTED->value ||
            $request->care_state_id == CareStateEnum::CANCELLED->value
        ) {
            $dogCares = DogCare::whereIn('state_id',
                [CareStateEnum::OWNER_REJECTED->value, CareStateEnum::CANCELLED->value]
            );
        }else {
            $dogCares = DogCare::where('state_id', '=', $request->care_state_id);
        }

        if(!$request->is_owner) {
            $dogCares->where('guardian_id', '=', $request->user_id);
        } else {
            $dogCares->whereHas('dogProfile', function (Builder $query) use ($request) {
                $query->where('user_id', '=', $request->user_id);
            });
        }

        //zaakceptowane(nadchodzące) opieki wyciągam bez paginacji
        if($request->care_state_id == CareStateEnum::OWNER_ACCEPTED->value) {
            return $dogCares->get();
        }

        return $dogCares->paginate(config('app.default_announcements_page_size'))->withQueryString();
    }

    public function acceptDogCare($dogCareId) {
        $dogCare = DogCare::find($dogCareId);
        $this->checkAuthorization($dogCare, true);

        if($dogCare->state_id != CareStateEnum::RECEIVED->value) {
            throw new HttpResponseException(response()->json([
                'error' => 'Nie możesz zmienić statusu tej opieki'
            ], Response::HTTP_BAD_REQUEST));
        }

        if($dogCare->datesOverlap()) {
            throw new HttpResponseException(response()->json([
                'error' => 'Masz już zaakceptowaną opiekę w tym terminie'
            ], Response::HTTP_BAD_REQUEST));
        }

        $dogCare->state_id = CareStateEnum::OWNER_ACCEPTED->value;
        $dogCare->save();

        Notification::send($dogCare->guardian, new DogCareAccepted($dogCare));

        return true;
    }

    public function cancelDogCare($dogCareId, CareStateEnum $state) {
        $dogCare = DogCare::find($dogCareId);
        if($state == CareStateEnum::OWNER_REJECTED) {
            $this->checkAuthorization($dogCare, true);
        } else {
            $this->checkAuthorization($dogCare, false);
        }

        if(
            $dogCare->state_id != CareStateEnum::RECEIVED->value &&
            $dogCare->state_id != CareStateEnum::OWNER_ACCEPTED->value
        ) {
            throw new HttpResponseException(response()->json([
                'error' => 'Nie możesz zmienić statusu tej opieki'
            ], Response::HTTP_BAD_REQUEST));
        }

        $dogCare->state_id = $state->value;
        $dogCare->save();

        if($state == CareStateEnum::OWNER_REJECTED) {
            Notification::send($dogCare->guardian, new DogCareRejected($dogCare));
        } else {
            Notification::send($dogCare->dogProfile->user, new DogCareCancelled($dogCare));
        }
        return true;
    }

    public function rateCare($request) {
        $dogCare = DogCare::find($request->dogCareId);
        $this->checkAuthorization($dogCare, true);

        if(
            $dogCare->state_id != CareStateEnum::DONE->value
        ) {
            throw new HttpResponseException(response()->json([
                'error' => 'Nie możesz wystawić oceny'
            ], Response::HTTP_BAD_REQUEST));
        }

        $dogCare->rating = $request->rating;
        $dogCare->comment = $request->comment;
        $dogCare->save();

        return true;
    }

    private function checkAuthorization(DogCare $dogCare, bool $isOwner)  {
        $userId = $isOwner ? $dogCare->dogProfile->user->id : $dogCare->guardian_id;

        if($userId !== auth()->user()->id) {
            throw new HttpResponseException(response()->json([
                'error' => 'UNAUTHORIZED'
            ], Response::HTTP_UNAUTHORIZED));
        }
    }

}
