<?php

namespace App\Http\Controllers;

use App\Models\DogProfile;
use Illuminate\Http\Request;

class DogProfileController extends Controller
{
    public function index(){
        $data = DogProfile::with(['breed', 'size', 'activities', 'availabilities', 'features'])->get();
        return response()->json(["status" => "ok", "data" => $data]);
    }
}
