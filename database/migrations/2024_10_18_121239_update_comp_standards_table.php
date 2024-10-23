<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comp_standards', function (Blueprint $table) {
            if (!Schema::hasColumn('comp_standards', 'priority')) {
                $table->enum('priority', ['Low', 'Medium', 'High'])->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comp_standards', function (Blueprint $table) {
            $table->dropColumn('priority');
        });
    }
};
