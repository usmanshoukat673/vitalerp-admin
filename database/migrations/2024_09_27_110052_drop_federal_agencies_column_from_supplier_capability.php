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
            $table->dropColumn('federal_agencies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supplier_capabilities', function (Blueprint $table) {
            $table->string('federal_agencies')->nullable();
        });
    }
};
