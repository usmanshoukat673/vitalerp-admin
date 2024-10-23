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
        Schema::table('comp_ctrls', function (Blueprint $table) {
            $table->integer('maturity_level')->nullable()->after('standard_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('comp_ctrls', function (Blueprint $table) {
            $table->dropColumn('maturity_level');
        });
    }
};
