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
        Schema::create('whistleblows', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->uuid('report_link')->unique('unique_report_link');
            $table->timestamps();

            $table->foreign('comp_id')
            ->references('id')->on('companies')
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
        Schema::dropIfExists('whistleblows');
    }
};
