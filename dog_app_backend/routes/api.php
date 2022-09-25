<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\DogCareController;
use App\Http\Controllers\DogProfileController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\MessagesController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [AuthController::class, 'logIn']);
Route::post('register', [AuthController::class, 'register']);


//DOGS
Route::get('/dogs', [DogProfileController::class, 'index']);
Route::get('/dogDetails', [DogProfileController::class, 'details']);

//ANNOUNCEMENTS
Route::get('/announcements', [AnnouncementController::class, 'index']);
Route::get('/announcements/announcementDetails', [AnnouncementController::class, 'details']);

//FILTERS
Route::get('/getDogProfileFilters', [FilterController::class, 'getDogProfileFilters']);

Route::get('/getDogFeatures', [FeatureController::class, 'index']);
Route::get('/getDogSizes', [SizeController::class, 'index']);
Route::get('/getActivities', [ActivityController::class, 'index']);
Route::get('/getAvailabilities', [AvailabilityController::class, 'index']);

//USERS
Route::controller(UserController::class)->group(function () {
    Route::get('users/userDetails', 'userDetails');
    Route::get('users/comments', 'getUserComments');
});

// AUTHENTICATED
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::controller(DogCareController::class)->group(function () {
        Route::post('/makeProposal', 'storeProposal');
        Route::post('/makeAnnouncementProposal', 'storeAnnouncementProposal');
        Route::get('/dogCares', 'getDogCares');
        Route::post('/dogCares/cancel', 'cancel');
        Route::post('/dogCares/accept', 'accept');
        Route::post('/dogCares/reject', 'reject');
        Route::post('/dogCares/rate-care', 'rate');
    });

    Route::controller(AnnouncementController::class)->group(function () {
        Route::get('/announcements/user', 'userAnnouncements');
        Route::post('/announcements/storeAnnouncement', 'store');
        Route::post('/announcements/updateAnnouncement', 'update');
        Route::post('/announcements/deleteAnnouncement', 'destroy');
        Route::post('/announcements/replacePhoto', 'replacePhoto');
    });

    Route::controller(DogProfileController::class)->group(function () {
        Route::get('dogs/user-dog-profiles', 'userDogProfiles');
        Route::post('dogs/store', 'store');
        Route::post('dogs/update', 'update');
        Route::post('dogs/destroy', 'destroy');
        Route::post('dogs/changeVisibility', 'changeVisibility');
    });

    Route::controller(PhotoController::class)->group(function () {
        Route::post('dogs/uploadPhoto', 'savePhoto')->name('DogProfile');
        Route::post('announcements/uploadPhoto', 'savePhoto')->name('Announcement');
        Route::post('users/uploadPhoto', 'savePhoto')->name('User');
        Route::post('deletePhoto', 'deletePhoto');
    });

    Route::controller(MessagesController::class)->group(function () {
        Route::get('messages/all', 'index');
        Route::get('messages/show', 'show');
        Route::post('messages/store', 'store');
        Route::put('messages/update', 'update');
    });



    Route::post('logout', [AuthController::class, 'logout']);
});


