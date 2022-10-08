<?php

namespace App\Http\Controllers;

use App\Http\Resources\SizeResource;
use App\Models\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{
    /**
     * Zwróć listę "wielkości" psów.
     */
    public function index()
    {
        $sizeCollection = SizeResource::collection(Size::all());
        return response()->json($sizeCollection);
    }

}
