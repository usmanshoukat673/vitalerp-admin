<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDirectoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('directories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('device_id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('comp_id');
            $table->string('path');
            $table->string('type'); // Directory or Drive
            $table->string('host')->nullable(); // device name
            $table->string('os')->nullable(); // device name
            $table->string('host_username')->nullable(); // device name
            $table->timestamps();

            $table->foreign('device_id')
                ->references('id')->on('watch_devices')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('directories');
    }
}
