<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRiskRegisterStdsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('risk_register_stds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedInteger('question_id');
            $table->unsignedInteger('control_id');
            $table->unsignedInteger('section_id');
            $table->unsignedInteger('standard_id');
            $table->unsignedBigInteger('risk_owner_id')->nullable();
            $table->integer('severity')->nullable();
            $table->integer('probabaility')->nullable();
            $table->integer('risk_rating')->nullable();
            $table->string('risk_action')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
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
        Schema::dropIfExists('risk_register_stds');
    }
}
