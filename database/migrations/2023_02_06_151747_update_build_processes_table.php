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
        Schema::table('build_business_processes', function (Blueprint $table) {
            $table->boolean('custom')->default(false)->after('included');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('build_business_processes', function (Blueprint $table) {
            $table->dropColumn('custom');
        });
    }
};
