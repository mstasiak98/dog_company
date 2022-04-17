<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result, $message){
        $response = [
            'data' => $result,
            'message' => $message,
            'success' => true,
        ];
        return response()->json($response);
    }

    public function sendErrorResponse($error, $messages = []){
        $response = [
            'success' => false,
            'message' => $error,
        ];
        if(!empty($messages)){
            $response['error'] = $messages;
        }
        return response()->json($response);
    }
}
