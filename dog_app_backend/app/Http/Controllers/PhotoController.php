<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    public function save(Request $request) {
        if($request->hasFile('photo') && $request->file('photo')->isValid()){
            $photo = $request->file('photo');
        }
        $path = $photo->store('photos');
        $url = Storage::url($path);
        $url2 = Storage::url('wX6lqUHRRR5p7JG7NNMCbj0ZVUdhh39DQEcs9jKv.jpg');
        return response()->json(
            [
                "status" => "ok",
                "data" => $photo->getFilename(),
                "type" =>$photo->getMimeType(),
                "path"=>$path,
                "url"=>$url,
                "url2"=>$url2
            ]
        );
    }
}
