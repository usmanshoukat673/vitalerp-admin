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
        Schema::create('build_business_processes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('build_id');
            $table->text('name');
            $table->longText('description')->nullable();
            $table->boolean('included')->default(false);
            $table->boolean('responded')->default(false);
            $table->timestamps();

            $table->foreign('build_id')
            ->references('id')->on('build_requests')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('build_business_processes');
    }
};
