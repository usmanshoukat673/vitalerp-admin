<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRiskRegisterStdTable01 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('risk_register_stds', function (Blueprint $table) {
            $table->string('answer', 5)->nullable()->after('standard_id');
            $table->text('notes')->nullable()->after('answer');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('risk_register_stds', function (Blueprint $table) {
            $table->dropColumn('answer', 'notes');
        });
    }
}
