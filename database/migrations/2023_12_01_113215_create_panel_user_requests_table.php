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
        Schema::create('panel_user_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('requested_by'); // user id who created/invited this user
            $table->unsignedInteger('comp_id'); // where got invited 
            $table->unsignedInteger('standard_id')->nullable(); // where got invited 
            $table->string('email');
            $table->integer('used')->default(0); // invite has been used or not 
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
        Schema::dropIfExists('panel_user_requests');
    }
};
