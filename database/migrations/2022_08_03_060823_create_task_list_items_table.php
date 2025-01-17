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
        Schema::create('task_list_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['checkbox', 'radio', 'fill_in_the_blank']);
            $table->unsignedBigInteger('list_type_id');
            $table->unsignedBigInteger('task_id');
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
        Schema::dropIfExists('task_list_items');
    }
};
