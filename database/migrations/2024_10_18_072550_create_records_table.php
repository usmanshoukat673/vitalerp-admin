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
        Schema::create('records', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->longText('description')->nullable();
            $table->unsignedBigInteger('parent')->nullable();
            $table->unsignedBigInteger('asset_id')->nullable();
            $table->unsignedInteger('module_id');
            $table->string('manufacturer')->nullable();
            $table->string('model_number')->nullable();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedBigInteger('created_by');
            $table->boolean('configured')->default(false);

            $table->foreign('parent')->references('id')->on('records')->onDelete('set null');
            $table->foreign('asset_id')->references('id')->on('lanscapes')->onDelete('cascade');
            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');


            $table->foreign('comp_id')
                ->references('id')->on('companies')
                ->onDelete('cascade');

            $table->foreign('created_by')
                ->references('id')->on('users')
                ->onDelete('cascade');

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
        Schema::dropIfExists('records');
    }
};