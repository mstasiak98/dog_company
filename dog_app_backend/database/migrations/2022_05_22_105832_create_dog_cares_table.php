<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDogCaresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dog_cares', function (Blueprint $table) {
            $table->id();
            $table->dateTime('start_date');
            $table->dateTime('end_date');
            $table->text('additional_info')->nullable();
            $table->boolean('siblings')->nullable();
            $table->double('rating')->nullable();
            $table->text('comment')->nullable();
            $table->unsignedBigInteger('activity_id');
            $table->foreign('activity_id')
                ->references('id')->on('activities')->onDelete('cascade');
            $table->unsignedBigInteger('guardian_id');
            $table->foreign('guardian_id')
                ->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('state_id');
            $table->foreign('state_id')
                ->references('id')->on('care_states')->onDelete('cascade');
            $table->foreignId('dog_profile_id')->nullable()
                ->references('id')->on('dog_profiles')->onDelete('cascade');
            $table->foreignId('announcement_id')->nullable()
                ->references('id')->on('announcements')->onDelete('cascade');
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
        Schema::dropIfExists('dog_cares');
    }
}
