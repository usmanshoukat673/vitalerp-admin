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
        Schema::create('supplier_socioenomics', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('ethnicity_id')->nullable();
            $table->date('exit_date')->nullable();
            $table->boolean('mentor_protege_program')->nullable();
            $table->text('relationships')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('comp_id')->references('id')->on('companies')->onDelete('cascade')->name('ss_comp_id_foreign');
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade')->name('ss_supplier_id_foreign');
            $table->foreign('ethnicity_id')->references('id')->on('ethnicities')->onDelete('set null')->name('ss_ethnicity_id_foreign');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null')->name('ss_updated_by_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_socioenomics');
    }
};
