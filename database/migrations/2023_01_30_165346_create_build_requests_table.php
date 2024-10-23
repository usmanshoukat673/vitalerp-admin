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
        Schema::create('build_requests', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->longText('overview')->nullable();
            $table->timestamp('email_sent_at');
            $table->string('ip')->nullable();
            $table->text('system')->nullable();
            $table->boolean('active')->default(true);
            $table->timestamp('used_at')->nullable();
            $table->integer('standard')->nullable();
            $table->bigInteger('user_id')->nullable();
            $table->bigInteger('comp_id')->nullable();
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
        Schema::dropIfExists('build_requests');
    }
};
