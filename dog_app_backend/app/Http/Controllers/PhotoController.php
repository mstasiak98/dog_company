<?php

namespace App\Http\Controllers;

use App\Http\Requests\Photo\PhotoRequest;
use App\Services\PhotoService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;

class PhotoController extends Controller

{

    public function savePhoto(Request $request, PhotoService $photoService) {

        $res = $photoService->uploadPhoto($request);
        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Wystąpił błąd podczas dodawania zdjęcia.'
        ], Response::HTTP_BAD_REQUEST));
    }

    public function deletePhoto(Request $request, PhotoService $photoService) {
        $res = $photoService->deletePhoto($request);

        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Wystąpił błąd podczas dodawania zdjęcia.'
        ], Response::HTTP_BAD_REQUEST));
    }


    /*public function save(Request $request) {
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
    }*/
}
