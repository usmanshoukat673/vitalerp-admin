<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGlobalActivitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('global_activities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id')->index();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('activity');
            $table->string('event_type');
            $table->unsignedInteger('standard_id')->index()->nullable();
            $table->unsignedInteger('section_id')->index()->nullable();
            $table->unsignedInteger('control_id')->index()->nullable();
            $table->string('ctrl_status')->nullable();
            $table->string('ctrl_applicability')->nullable();
            $table->unsignedInteger('document_id')->index()->nullable();
            $table->string('page')->nullable();
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
        Schema::dropIfExists('global_activities');
    }
}
