<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCompCtrlsTable01 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('comp_ctrls', function (Blueprint $table) {
            $table->enum('applicable', ['Applicable', 'Not Applicable'])->nullable()->after('standard_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comp_ctrls', function (Blueprint $table) {
            $table->dropColumn('applicable');
        });
    }
}
