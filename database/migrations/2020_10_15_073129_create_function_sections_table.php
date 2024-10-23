<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFunctionSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('function_sections', function (Blueprint $table) {
            $table->unsignedInteger('function_id');
            $table->unsignedInteger('section_id');
            $table->unsignedInteger('standard_id');
            $table->string('menu_name')->nullable();
            $table->string('abbreviation')->nullable();
            $table->timestamps();

            $table->primary(['function_id', 'section_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('function_sections');
    }
}
