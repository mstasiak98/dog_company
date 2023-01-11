<?php

namespace App\Http\Controllers\Authentication;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\User\ChangePasswordRequest;
use App\Http\Resources\UserResource;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends BaseController
{

    public function logIn(LoginRequest $request){

        $reqUser=User::where("email", $request->email)->first();

        if(is_null($reqUser)) {
            return $this->sendErrorResponse('No user found', ['not_found'=>'Podany email nie istnieje']);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $data['access_token'] = $user->createToken('access_token')->plainTextToken;
            $data['user'] = new UserResource($user);

            return $this->sendResponse($data, 'Success');
        }else{
            return $this->sendErrorResponse('Not authorized', ['unauthorized'=>'Niepoprawne dane logowania']);
        }
    }

    public function register(RegisterRequest $request){

        try {
            $photo = null;
            if($request->hasFile('photo') && $request->file('photo')->isValid()){
                $photo = $request->file('photo')->store('photos');
                if(!is_string($photo)){
                    return $this->sendErrorResponse('Error', ['photo_error'=>'Wystąpił błąd podczas zapisywania zdjęcia']);
                }
            }else if ($request->hasFile('photo') && !$request->file('photo')->isValid()){
                return $this->sendErrorResponse('Error', ['photo_error'=>'Wystąpił błąd podczas przesyłania zdjęcia']);
            }

            $data = DB::transaction(function () use ($request, $photo){
                //Create user and assign role
                $request['password'] = Hash::make($request->password);
                $user = User::create($request->all());
                $userRole = Role::findByName(config('app.user_role'));
                if(isset($userRole) && isset($user)){
                    $user->assignRole($userRole);
                }
                //prepare user data for message to front
                $data = [];
                $data['access_token'] = $user->createToken('access_token')->plainTextToken;
                $data['user'] = new UserResource($user);

                // if photo exists save it to database
                if(is_string($photo)) {
                    $user_photo = new Photo();
                    $user_photo->url = Storage::url($photo);
                    $user_photo->filename = $photo;
                    $user_photo->photoable()->associate($user);
                    $user_photo->save();
                }

                return $data;
            });
        } catch (\Exception $e) {
            if(is_string($photo)) {
               Storage::delete($photo);
            }
            return $this->sendErrorResponse('Error', ['registration_error'=>'Wystąpił błąd poczas rejestracji', 'error' => $e]);
        }

        return $this->sendResponse($data, 'Success');
    }

    public function logout() {
        auth()->user()->currentAccessToken()->delete();
        return $this->sendResponse(null, 'Success');
    }

    public function changePassword(ChangePasswordRequest $request) {

        $reqUser=User::where("email", $request->email)->first();

        if(is_null($reqUser)) {
            throw new HttpResponseException(response()->json([
                'error' => 'Niepoprawne dane konta'
            ], Response::HTTP_UNAUTHORIZED));
        }


        if (auth()->attempt(['email' => $request->email, 'password' => $request->old_password])){
            $user = Auth::user();
            $user->password = Hash::make($request->new_password);
            $user->save();
            return response()->json(['success' => true]);
        }else{
            return $this->sendErrorResponse('Not authorized', ['unauthorized'=>'Niepoprawne dane logowania']);
        }
    }

}
