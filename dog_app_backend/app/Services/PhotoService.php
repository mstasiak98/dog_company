<?php

namespace App\Services;

use App\Http\Requests\DogProfile\StoreDogProfileRequest;
use App\Models\Photo;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PhotoService
{

    public function storePhotoOnDisk(UploadedFile $file) {
        $photo = false;
        if($file->isValid()) {
            $photo = $file->store('photos');
        }

        return $photo;
    }

    public function storePhotos(StoreDogProfileRequest $request) {
        $paths = [];
        foreach ($request->file('photo') as $file) {
            $filePath = $file->store('photos');
            if($filePath === false) {
                $this->revertSaveFile($paths);
                return false;
            }
            $paths[] = $filePath;
        }
        return $paths;
    }

    public function revertSaveFile(array $fileUrls) {
        foreach ($fileUrls as $fileUrl) {
            Storage::delete($fileUrl);
        }
    }

    public function replacePhotoOnDisk(UploadedFile $file, string $filePath) {
        $deleteResult = Storage::delete($filePath);
        $addResult = $this->storePhotoOnDisk($file);

        if($deleteResult && is_string($addResult)){
            return $addResult;
        }

        return false;
    }

    public function deletePhotoFromDisk(string $filePath): bool {
        return Storage::delete($filePath);
    }

    public function handlePhotoStorageReplace(UploadedFile | null $file, string | null $filePath, bool | null $isDeletePhoto): bool | string | null {
        $photo = null;
        if(!is_null($file)) {
            if(is_null($filePath)) {
                $photo = $this->storePhotoOnDisk($file);
            } else {
                $photo = $this->replacePhotoOnDisk($file, $filePath);
            }
        } else if (!is_null($filePath) && $isDeletePhoto === true) {
            $photo = $this->deletePhotoFromDisk($filePath);
        }
        return $photo;
    }

    public function handlePhotoDbReplace(string | bool $photo, Model $model, Photo | null $oldPhoto): void {
        if($photo === true) {
            $this->deletePhotoFromDB($oldPhoto);
        } else if(is_string($photo) && is_null($oldPhoto)) {
            $this->storePhotoInDB($photo, $model);
        } else {
            $this->updatePhotoInDB($photo, $model, $oldPhoto);
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

    public function updatePhotoInDB(string $photo, Model $model, Photo $oldPhoto): void{
        $oldPhoto->url = Storage::url($photo);
        $oldPhoto->filename = $photo;
        $oldPhoto->photoable()->associate($model);
        $oldPhoto->save();
    }
    public function deletePhotoFromDB(Photo $oldPhoto): void {
        $oldPhoto->delete();
    }

}
