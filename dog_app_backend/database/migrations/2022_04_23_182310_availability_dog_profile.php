<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AvailabilityDogProfile extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('availability_dog_profile', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('availability_id');
            $table->foreign('availability_id')
                ->references('id')->on('availabilities')->onDelete('no action');
            $table->unsignedBigInteger('dog_profile_id');
            $table->foreign('dog_profile_id')
                ->references('id')->on('dog_profiles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('availability_dog_profile');
    }
}
