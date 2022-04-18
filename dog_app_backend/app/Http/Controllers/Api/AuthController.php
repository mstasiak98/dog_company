<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends BaseController
{
    public function logIn(Request $request){

        $validator = Validator::make($request->all(),[
            "email"=>"required|email",
            "password"=>"required",
        ]);

        if($validator->fails()){
            return $this->sendErrorResponse('Validation errors', $validator->errors());
        }

        $reqUser=User::where("email", $request->email)->first();

        if(is_null($reqUser)) {
            return $this->sendErrorResponse('No user found', ['not_found'=>'Podany email nie istnieje']);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = Auth::user();
            $data['access_token'] = $user->createToken('access_token')->plainTextToken;
            $data['name'] = $user->name;
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
        $validator = Validator::make(json_decode(json_encode($accountData), true),[
            "firstName"=>"required",
            "lastName"=>"required",
        ]);

        if($validator->fails()){
            return response()->json(["status" => "failed", "data" => 'FAIL']);
        }

        if($request->hasFile('photo') && $request->file('photo')->isValid()){
            $photo = $request->file('photo');
        }
        return response()->json(["status" => "ok", "data" => $accountData->firstName]);
    }

}
