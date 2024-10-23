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
        Schema::create('whistle_reports', function (Blueprint $table) {
            $table->id();
            $table->string('code'); // encrypted code for user 
            $table->unsignedBigInteger('whistle_id');
            $table->unsignedBigInteger('wshigle_category_id');
            $table->longText('description');
            $table->timestamps();

            $table->foreign('whistle_id')
            ->references('id')->on('whistleblows')
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
        Schema::dropIfExists('whistle_reports');
    }
};
