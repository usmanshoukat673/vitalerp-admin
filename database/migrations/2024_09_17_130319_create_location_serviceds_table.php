<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('location_serviceds', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('slcd_id')->index('lsd_slcd_id_foreign');
            $table->unsignedBigInteger('state_id');
            $table->timestamps();

            $table->foreign('slcd_id')->references('id')->on('supplier_labor_category_details')->onDelete('cascade')->name('lsd_slcd_id_foreign');
            $table->foreign('state_id')->references('id')->on('country_states')->onDelete('cascade')->name('lsd_state_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_serviceds');
    }
};
