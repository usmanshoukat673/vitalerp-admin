<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDeviceDetailsForIpDetails extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('watch_devices', function (Blueprint $table) {
            $table->string('ip_hostname')->nullable()->after('public_ip');
            $table->string('latitude')->nullable()->after('ip_hostname');
            $table->string('longitude')->nullable()->after('latitude');
            $table->string('city')->nullable()->after('longitude');
            $table->string('country')->nullable()->after('city');
            $table->string('postalcode')->nullable()->after('country');
            $table->string('timezone')->nullable()->after('postalcode');
            $table->string('region')->nullable()->after('timezone');
            $table->string('ip_org')->nullable()->after('region');
            $table->string('last_request_ip')->nullable()->after('ip_org');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('watch_devices', function (Blueprint $table) {
            $table->dropColumn(['latitude', 'longitude', 'city', 'country', 'postalcode', 'timezone', 'region', 'ip_hostname', 'ip_org', 'last_request_ip']);
        });
    }
}
