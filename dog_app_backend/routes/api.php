<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\DogProfileController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\FilterController;
use App\Http\Controllers\PhotoController;
use App\Http\Controllers\SizeController;
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

Route::post('/test', function (Request $request){
    error_log($request);
});




//DOGS
Route::get('/dogs', [DogProfileController::class, 'index']);
Route::get('/dogDetails', [DogProfileController::class, 'details']);

//FILTERS
Route::get('/getDogProfileFilters', [FilterController::class, 'getDogProfileFilters']);

Route::get('/getDogFeatures', [FeatureController::class, 'index']);
Route::get('/getDogSizes', [SizeController::class, 'index']);
Route::get('/getActivities', [ActivityController::class, 'index']);
Route::get('/getAvailabilities', [AvailabilityController::class, 'index']);


Route::post('/save-photo', [PhotoController::class, 'save']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('logout', [AuthController::class, 'logout']);
});


