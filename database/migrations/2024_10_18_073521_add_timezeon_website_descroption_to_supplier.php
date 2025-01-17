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
        Schema::table('suppliers', function (Blueprint $table) {
            $table->string('timezone')->nullable();
            $table->string('website')->nullable()->after('timezone');
            $table->longText('description')->nullable()->after('website');
            $table->unsignedBigInteger('updated_by')->nullable()->after('description');

            //$table->foreign('updated_by')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('suppliers', function (Blueprint $table) {
            $table->dropForeign('suppliers_updated_by_foreign');
            $table->dropColumn('timezone', 'website', 'description', 'updated_by');
        });
    }
};