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
        Schema::create('policy_portals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->uuid('link')->unique('unique_portal_link');
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
        Schema::dropIfExists('policy_portals');
    }
};
