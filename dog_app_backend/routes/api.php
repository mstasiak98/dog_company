<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DogProfileController;
use App\Http\Controllers\PhotoController;
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

Route::get('/dog-profile', [DogProfileController::class, 'index']);

Route::post('/save-photo', [PhotoController::class, 'save']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('logout', [AuthController::class, 'logout']);
});


