<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CareState extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function dogCares() {
        return $this->hasMany(DogCare::class);
    }
}
