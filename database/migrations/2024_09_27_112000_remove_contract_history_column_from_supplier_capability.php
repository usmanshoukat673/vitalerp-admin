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
            $table->dropColumn('contract_history');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supplier_capabilities', function (Blueprint $table) {
            $table->unsignedBigInteger('contract_history')->nullable();
        });
    }
};
