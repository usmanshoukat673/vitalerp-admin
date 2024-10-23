<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDirectoryActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('directory_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('directory_id');
            $table->string('event'); // created, deleted, copied, move, changed, copy, error, rename
            $table->string('type'); // directory, file
            $table->string('path')->nullable();
            $table->string('name');
            $table->string('extention')->nullable();
            $table->string('size')->nullable();
            $table->string('event_date');
            $table->string('access_date')->nullable();
            $table->string('write_date')->nullable();
            $table->string('permissions')->nullable();
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
        Schema::dropIfExists('directory_activities');
    }
}
