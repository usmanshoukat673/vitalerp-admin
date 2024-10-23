<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompCtrlsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comp_ctrls', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedInteger('control_id');
            $table->unsignedInteger('section_id');
            $table->unsignedInteger('standard_id');
            $table->string('status')->nullable()->default('Not Implemented');
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
        Schema::dropIfExists('comp_ctrls');
    }
}
