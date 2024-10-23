<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('whistle_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('whistle_report_id');
            $table->string('name');
            $table->string('ext')->nullable();
            $table->integer('size')->nullable();
            $table->string('location');
            $table->timestamps();

            $table->foreign('whistle_report_id')
            ->references('id')->on('whistle_reports')
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
        Schema::dropIfExists('whistle_files');
    }
};
