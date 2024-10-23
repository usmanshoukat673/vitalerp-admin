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
        Schema::create('build_suppliers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('build_id')->index();
            $table->unsignedBigInteger('standard_id')->index();
            $table->text('name');
            $table->boolean('included')->default(false);
            $table->boolean('custom')->default(false);
            $table->boolean('responded')->default(false);
            $table->timestamps();

            $table->foreign('build_id')
            ->references('id')->on('build_requests')
            ->onDelete('cascade');

            $table->foreign('standard_id')
            ->references('id')->on('standards')
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
        Schema::dropIfExists('build_suppliers');
    }
};