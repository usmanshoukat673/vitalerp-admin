<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUserForWatchMobile extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('watch_number_cd')->nullable()->comment('watch number country code')->after('phone');
            $table->string('watch_number')->nullable()->after('watch_number_cd');
            $table->boolean('watch_configured')->default(false)->after('watch_number');
            $table->timestamp('watch_configured_at')->nullable()->after('watch_configured');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['watch_number', 'watch_configured', 'watch_configured_at']);
        });
    }
}
