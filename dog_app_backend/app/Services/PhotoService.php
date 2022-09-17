<?php

namespace App\Services;

use App\Http\Requests\DogProfile\StoreDogProfileRequest;
use App\Models\Photo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use mysql_xdevapi\Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PhotoService
{



    public function uploadPhoto(Request $request) {
        $model = $this->getModelFromRouteName($request)::find($request->modelId);

        $filePaths = $this->savePhotosOnDisk($request);
        if ($filePaths === false || count($filePaths) === 0) {
            throw new HttpResponseException(response()->json([
                'error' => 'Wystąpił błąd podczas dodawania zdjęcia.'
            ], Response::HTTP_BAD_REQUEST));
        }

        try {
            DB::transaction(function () use ($filePaths, $model){
                $this->storePhotosInDB($filePaths, $model);
            });
        } catch (\Exception $e) {
            if(is_array($filePaths)){
                $this->revertSavePhotosOnDisk($filePaths);
            }

            throw new HttpResponseException(response()->json([
                'error' => 'Wystąpił błąd podczas dodawania zdjęcia.'
            ], Response::HTTP_BAD_REQUEST));
        }

        return true;
    }

    public function deletePhoto(Request $request) {
        $photo = Photo::find($request->photoId);
        $filePath = $photo->filename;
        $photo->delete();
        Storage::delete($filePath);

        return true;
    }

    public function savePhotoOnDisk(UploadedFile $file) {
        $photo = false;
        if($file->isValid()) {
            $photo = $file->store('photos');
        }

        return $photo;
    }

    public function savePhotosOnDisk(Request $request) {
        $paths = [];
        foreach ($request->file('photo') as $file) {
            $filePath = $file->store('photos');
            if($filePath === false) {
                $this->revertSavePhotosOnDisk($paths);
                return false;
            }
            $paths[] = $filePath;
        }
        return $paths;
    }

    public function revertSavePhotosOnDisk(array $fileUrls) {
        foreach ($fileUrls as $fileUrl) {
            Storage::delete($fileUrl);
        }
    }

    public function storePhotoInDB(string $photo, Model $model): void {
        $newPhoto = new Photo();
        $newPhoto->url = Storage::url($photo);
        $newPhoto->filename = $photo;
        $newPhoto->photoable()->associate($model);
        $newPhoto->save();
    }

    public function storePhotosInDB(array $filePaths, Model $model): void {
        foreach ($filePaths as $filePath){
            $photo = new Photo();
            $photo->url = Storage::url($filePath);
            $photo->filename = $filePath;
            $photo->photoable()->associate($model);
            $photo->save();
        }
    }

    public function deletePhotoFromDB(Photo $oldPhoto): void {
        $oldPhoto->delete();
    }

    public function getModelFromRouteName(Request $request): Model {
        $modelName =  'App\\Models\\'.$request->route()->getName();
        return new $modelName;
    }

}
