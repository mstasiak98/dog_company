<?php

namespace App\Http\Controllers;

use App\Http\Requests\Photo\DeletePhotoRequest;
use App\Http\Requests\Photo\PhotoRequest;
use App\Http\Requests\Photo\ReplacePhotoRequest;
use App\Services\PhotoService;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PhotoController extends Controller

{

    public function savePhoto(PhotoRequest $request, PhotoService $photoService) {

        $res = $photoService->uploadPhoto($request);
        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Wystąpił błąd podczas dodawania zdjęcia.'
        ], Response::HTTP_BAD_REQUEST));
    }

    public function deletePhoto(DeletePhotoRequest $request, PhotoService $photoService) {
        $res = $photoService->deletePhoto($request);

        if($res) {
            return response()->json(['success' => true]);
        }

        throw new HttpResponseException(response()->json([
            'error' => 'Wystąpił błąd podczas dodawania zdjęcia.'
        ], Response::HTTP_BAD_REQUEST));
    }

}
