<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDogProfilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dog_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('color');
            $table->boolean('visible')->default(true);
            $table->text('description');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('breed_id');
            $table->unsignedBigInteger('size_id');
            $table->foreign('user_id')
                ->references('id')->on('users');
            $table->foreign('breed_id')
                ->references('id')->on('breeds');
            $table->foreign('size_id')
                ->references('id')->on('sizes');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('dog_profiles');
    }
}
