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
        Schema::create('columns', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('subject_id');
            $table->unsignedBigInteger('field_type_id');
            $table->string('field_model');
            $table->string('component');
            $table->string('name');
            $table->text('description')->nullable();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedBigInteger('project_id');
            $table->unsignedBigInteger('created_by'); // created by 
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
        Schema::dropIfExists('columns');
    }
};
