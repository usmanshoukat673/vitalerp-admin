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
        Schema::create('capability_prime_contracts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_capability_id');
            $table->unsignedBigInteger('prime_contract_id');
            $table->timestamps();

            $table->unique(['supplier_capability_id', 'prime_contract_id'])->name('cp_unique');

            $table->foreign('supplier_capability_id')->references('id')->on('supplier_capabilities')->onDelete('cascade')->name('cp_sci_foreign');
            $table->foreign('prime_contract_id')->references('id')->on('prime_contracts')->onDelete('cascade')->name('cp_prime_contract_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capability_prime_contracts');
    }
};
