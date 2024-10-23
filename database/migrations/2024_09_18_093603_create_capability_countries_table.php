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
        Schema::create('capability_countries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_capability_id');
            $table->unsignedBigInteger('country_code_id');
            $table->timestamps();

            $table->unique(['supplier_capability_id', 'country_code_id'])->name('ccs_unique');

            $table->foreign('supplier_capability_id')->references('id')->on('supplier_capabilities')->onDelete('cascade')->name('ccs_sci_foreign');
            $table->foreign('country_code_id')->references('id')->on('country_codes')->onDelete('cascade')->name('ccs_country_code_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capability_countries');
    }
};
