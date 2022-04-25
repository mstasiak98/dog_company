<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Photo;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Spatie\Permission\Models\Role;

class AuthController extends BaseController
{
    public function logIn(LoginRequest $request){

        /*$validator = Validator::make($request->all(),[
            'email'=>'required|email',
            'password'=>'required',
        ]);

        if($validator->fails()){
            return $this->sendErrorResponse('Validation errors', $validator->errors());
        }*/

        $reqUser=User::where("email", $request->email)->first();

        if(is_null($reqUser)) {
            return $this->sendErrorResponse('No user found', ['not_found'=>'Podany email nie istnieje']);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $data['access_token'] = $user->createToken('access_token')->plainTextToken;
            $data['first_name'] = $user->first_name;
            $data['user_id'] = $user->id;

            return $this->sendResponse($data, 'Success');
        }else{
            return $this->sendErrorResponse('Not authorized', ['unauthorized'=>'Niepoprawne dane logowania']);
        }
    }

    public function register(Request $request){
        // dane w requescie nie sa w postaci obiektu, tylko jsona w stringu, tutaj je zamieniam na obiekt
        $accountData = is_string($request->get('data')) ?
            json_decode($request->get('data')) : (object) ($request->get('data'));
        if(!isset($accountData) || !is_object($accountData)){
            return $this->sendErrorResponse('Invalid request', ['invalid'=>'Błędne zapytanie']);
        }

        // zamiana std class na array
        $args = json_decode(json_encode($accountData), true);

        $validator = Validator::make($args,[
            'first_name'=>['required'],
            'last_name'=>['required'],
            'email'=>['required','unique:users','email'],
            'password'=>['required', 'min:6'],
            'phone_number'=>['required', 'unique:users', 'regex:/(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/'],
            'city'=>['required'],
            'street'=>['required'],
            'zip_code'=>['required', 'regex:/^([0-9]{2})(-[0-9]{3})?$/i'],
            'house_number'=>['required']
        ]);

        if($validator->fails()){
            return $this->sendErrorResponse($accountData, $validator->errors());
        }

        $args['password'] = Hash::make($args['password']);
        if($request->hasFile('photo') && $request->file('photo')->isValid()) {
            $photo = $request->file('photo')->store('photos');
            if(!$photo) {
                return $this->sendErrorResponse('Registration error', ['registration_error'=>'Wystąpił błąd podczas rejestracji']);
            }

            $data = DB::transaction(function () use ($args, $photo){
                $user = User::create($args);
                $data = [];
                $data['access_token'] = $user->createToken('access_token')->plainTextToken;
                $data['name'] = $user->first_name;
                $data['user_id'] = $user->id;
                $user_photo = new Photo();
                $user_photo->url = Storage::url($photo);
              /*  Photo::create([
                    'url'=>Storage::url($photo),
                ]);*/
                $user_photo->photoable()->associate($user);
                $user_photo->save();
                return $data;
            });
        }else {
            $user = User::create($args);
            $data['access_token'] = $user->createToken('access_token')->plainTextToken;
            $data['first_name'] = $user->first_name;
            $data['user_id'] = $user->id;
        }
        $user = User::find($data['user_id']);
        $userRole = Role::findByName(config('app.user_role'));
        if(isset($userRole) && isset($user)){
            $user->assignRole($userRole);
        }

        return $this->sendResponse($data, 'Success');
    }

    public function logout() {
        auth()->user()->currentAccessToken()->delete();
        return $this->sendResponse(null, 'Success');
    }

}
