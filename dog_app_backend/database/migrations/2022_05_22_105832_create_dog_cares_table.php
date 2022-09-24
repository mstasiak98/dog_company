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
            $table->string('additional_info')->nullable();
            $table->boolean('siblings')->nullable();
            $table->double('rating')->nullable();
            $table->text('comment')->nullable();
            $table->unsignedBigInteger('activity_id');
            $table->foreign('activity_id')
                ->references('id')->on('activities')->onDelete('no action');
            $table->unsignedBigInteger('guardian_id');
            $table->foreign('guardian_id')
                ->references('id')->on('users')->onDelete('no action');
            $table->unsignedBigInteger('state_id');
            $table->foreign('state_id')
                ->references('id')->on('care_states')->onDelete('no action');
            $table->foreignId('dog_profile_id')->nullable()
                ->references('id')->on('dog_profiles')->onDelete('no action');
            $table->foreignId('announcement_id')->nullable()
                ->references('id')->on('announcements')->onDelete('no action');
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
