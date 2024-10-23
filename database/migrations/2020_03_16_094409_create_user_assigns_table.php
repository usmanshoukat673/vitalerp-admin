<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAssignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_assigns', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('assigned_by');
            $table->unsignedInteger('assigned_to');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('email');
            $table->string('role', 5);
            $table->integer('status')->default(0); // 1 accepted, 2 rejected, 0 pending
            $table->timestamp('action_taken_at')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('user_assigns');
    }
}
