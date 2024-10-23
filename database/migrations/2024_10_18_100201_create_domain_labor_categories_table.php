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
        Schema::create('domain_labor_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('domain_id');
            $table->unsignedBigInteger('labor_category_id');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('domain_id')->references('id')->on('domains')->onDelete('cascade');
            $table->foreign('labor_category_id')->references('id')->on('labor_categories')->onDelete('cascade');

            // Unique constraint to prevent duplicate entries
            $table->unique(['domain_id', 'labor_category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('domain_labor_categories');
    }
};
