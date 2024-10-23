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
        Schema::create('capability_agencies', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_capability_id');
            $table->unsignedBigInteger('agency_id');
            $table->timestamps();

            $table->unique(['supplier_capability_id', 'agency_id'])->name('ca_unique');

            $table->foreign('supplier_capability_id')->references('id')->on('supplier_capabilities')->onDelete('cascade')->name('ca_sci_foreign');
            $table->foreign('agency_id')->references('id')->on('agencies')->onDelete('cascade')->name('ca_agency_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capability_agencies');
    }
};
