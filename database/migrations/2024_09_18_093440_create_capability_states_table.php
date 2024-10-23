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
        Schema::create('capability_states', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_capability_id');
            $table->unsignedBigInteger('state_id');
            $table->timestamps();

            $table->unique(['supplier_capability_id', 'state_id'])->name('cs_unique');

            $table->foreign('supplier_capability_id')->references('id')->on('supplier_capabilities')->onDelete('cascade')->name('cs_sci_foreign');
            $table->foreign('state_id')->references('id')->on('country_states')->onDelete('cascade')->name('cs_state_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capability_states');
    }
};
