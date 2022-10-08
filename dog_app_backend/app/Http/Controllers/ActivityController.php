<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    /**
     * Zwróć listę "aktywności".
     *
     *
     */
    public function index()
    {
        $activityCollection = ActivityResource::collection(Activity::all());
        return response()->json($activityCollection);
    }

}
