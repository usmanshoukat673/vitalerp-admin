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
        Schema::table('build_functions', function (Blueprint $table) {
            $table->boolean('asset_executed')->default(false)->after('responded');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('build_functions', function (Blueprint $table) {
            $table->dropColumn('asset_executed');
        });
    }
};
