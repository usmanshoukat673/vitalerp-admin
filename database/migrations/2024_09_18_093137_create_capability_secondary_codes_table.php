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
        Schema::create('capability_secondary_codes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_capability_id');
            $table->unsignedBigInteger('naics_code_id');
            $table->timestamps();

            $table->unique(['supplier_capability_id', 'naics_code_id'])->name('scs_unique');

            $table->foreign('supplier_capability_id')->references('id')->on('supplier_capabilities')->onDelete('cascade')->name('scs_sci_foreign');
            $table->foreign('naics_code_id')->references('id')->on('naics_codes')->onDelete('cascade')->name('scs_naics_code_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capability_secondary_codes');
    }
};
