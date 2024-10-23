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
        Schema::create('socioenomic_statuses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_socioenomic_id');
            $table->unsignedBigInteger('socioenomic_id');
            $table->timestamps();

            $table->unique(['supplier_socioenomic_id', 'socioenomic_id'])->name('ss_unique');

            $table->foreign('supplier_socioenomic_id')->references('id')->on('supplier_socioenomics')->onDelete('cascade')->name('ss_sci_foreign');
            $table->foreign('socioenomic_id')->references('id')->on('socioenomics')->onDelete('cascade')->name('ss_socioenomic_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('socioenomic_statuses');
    }
};
