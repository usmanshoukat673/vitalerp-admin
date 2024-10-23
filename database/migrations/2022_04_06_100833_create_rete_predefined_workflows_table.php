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
        Schema::create('rete_defined_workflows', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('createdAt');
            $table->integer('views')->nullable();
            $table->integer('totalViews')->nullable();
            $table->integer('recentViews')->nullable();
            $table->json('user')->nullable();
            $table->json('nodes')->nullable();
            $table->json('workflow')->nullable();
            $table->json('workflowInfo')->nullable();
            $table->longText('description')->nullable();
            $table->json('image')->nullable();
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
        Schema::dropIfExists('rete_defined_workflows');
    }
};
