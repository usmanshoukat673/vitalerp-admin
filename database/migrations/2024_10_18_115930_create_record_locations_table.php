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
        Schema::create('record_locations', function (Blueprint $table) {
            $table->unsignedBigInteger('record_id');
            $table->unsignedBigInteger('location_id');
            $table->unsignedInteger('question_id');
            $table->unsignedBigInteger('asset_id');
            $table->unsignedInteger('module_id');
            $table->timestamps();

            $table->primary(['record_id', 'location_id', 'question_id']);
            $table->foreign('record_id')->references('id')->on('records')->onDelete('cascade');
            $table->foreign('location_id')->references('id')->on('company_locations')->onDelete('cascade');
            $table->foreign('asset_id')->references('id')->on('lanscapes')->onDelete('cascade');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('asset_questions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('record_locations');
    }
};