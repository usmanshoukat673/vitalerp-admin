<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('error_log', function (Blueprint $table) {
            $table->id('error_id');
            $table->string('table_name', 255);
            $table->string('operation', 255);
            $table->text('error_message');
            $table->timestamp('error_time')->default(DB::raw('CURRENT_TIMESTAMP'));

            $table->index('table_name');
            $table->index('operation');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('error_log');
    }
};
