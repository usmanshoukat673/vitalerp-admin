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
        Schema::table('build_requests', function (Blueprint $table) {
            $table->string('company_name')->nullable()->after('email');
            $table->string('city')->nullable()->after('company_name');
            $table->string('state')->nullable()->after('city');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('build_requests', function (Blueprint $table) {
            $table->dropColumn(['company_name', 'city', 'state']);
        });
    }
};
