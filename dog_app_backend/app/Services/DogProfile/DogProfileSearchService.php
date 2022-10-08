<?php

namespace App\Services\DogProfile;

use App\Http\Resources\DogProfileCollection;
use App\Models\DogProfile;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class DogProfileSearchService
{

    public function search(Request $request)
    {
        $filters = $request->all();
        unset($filters['page']);

        if((is_null($filters) || count($filters) <= 0)) {
            return DogProfile::where('visible', '=', 1)->paginate(config('app.default_page_size'))->withQueryString();
        }

        $dogs = DogProfile::where('visible', '=', 1);
        foreach ($filters as $filter => $idsArray) {

            //nazwa relacji w l.poj, a nazwa tabeli w l.m
            if($filter === 'sizes' || $filter === 'breeds') {
                $dogs->whereHas(substr($filter, 0, -1), function (Builder $query) use ($idsArray, $filter){
                    $query->whereIn(($filter.'.id'), (array) $idsArray );
                });
            } else {
                $dogs->whereHas($filter, function (Builder $query) use ($idsArray, $filter) {
                    $query->whereIn(($filter . '.id'), (array)$idsArray);
                });
            }
        }

        return $dogs->paginate(config('app.default_page_size'))->withQueryString();
    }

}
