<?php

namespace App\Http\Controllers;

use App\Http\Resources\FeatureResource;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    /**
     * Zwróć listę "cech".
     */
    public function index()
    {
        $featureCollection = FeatureResource::collection(Feature::all());
        return response()->json($featureCollection);
    }

}
