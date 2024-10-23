<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRiskRegisterCstsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('risk_register_csts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->string('risk_id')->nullable();
            $table->text('question');
            $table->text('control')->nullable();
            $table->text('section')->nullable();;
            $table->text('standard')->nullable();;
            $table->unsignedBigInteger('risk_owner_id')->nullable();
            $table->integer('severity')->nullable();
            $table->integer('probabaility')->nullable();
            $table->integer('risk_rating')->nullable();
            $table->string('risk_action')->nullable();
            $table->unsignedBigInteger('updated_by');
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
        Schema::dropIfExists('risk_register_csts');
    }
}
