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
        Schema::create('supplier_capabilities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('primary_naics_code')->nullable();
            $table->string('federal_agencies')->nullable();
            $table->boolean('prime_contracts')->nullable();
            $table->boolean('primed_contract_last_two_years')->nullable();
            $table->unsignedBigInteger('contract_history')->nullable();
            $table->text('acquisition_contracts')->nullable();
            $table->text('product_and_services')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('comp_id')->references('id')->on('companies')->onDelete('cascade')->name('sc_comp_id_foreign');
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade')->name('sc_supplier_id_foreign');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null')->name('sc_updated_by_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_capabilities');
    }
};
