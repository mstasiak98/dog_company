<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Exceptions\HttpResponseException;

class AuthorizationHelper
{

    public static function checkAuthorization(Model $model, string $methodName)
    {
        if(!auth()->user()->can($methodName, $model)) {
            throw new HttpResponseException(response()->json([
                'error' => 'Brak autoryzacji.'
            ], 403));
        }
    }

}
