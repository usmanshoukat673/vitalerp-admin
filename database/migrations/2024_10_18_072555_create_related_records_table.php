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
        Schema::create('related_records', function (Blueprint $table) {
            $table->unsignedBigInteger('record_id');
            $table->unsignedBigInteger('related_record_id');
            $table->unsignedInteger('question_id')->nullable();
            $table->unsignedBigInteger('asset_id');
            $table->unsignedInteger('module_id');
            $table->timestamps();

            $table->primary(['record_id', 'related_record_id']);
            $table->foreign('record_id')->references('id')->on('records')->onDelete('cascade');
            $table->foreign('related_record_id')->references('id')->on('records')->onDelete('cascade');
            $table->foreign('question_id')->references('id')->on('asset_questions')->onDelete('cascade');
            $table->foreign('asset_id')->references('id')->on('lanscapes')->onDelete('cascade');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('related_records');
    }
};