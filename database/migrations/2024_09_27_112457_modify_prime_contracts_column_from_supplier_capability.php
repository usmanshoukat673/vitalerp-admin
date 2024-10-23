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
        Schema::table('supplier_capabilities', function (Blueprint $table) {
            $table->dropColumn('prime_contracts');
            $table->boolean('has_prime_contracts')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supplier_capabilities', function (Blueprint $table) {
            $table->boolean('prime_contracts')->nullable();
            $table->dropColumn('has_prime_contracts');
        });
    }
};
