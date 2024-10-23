<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateUserCompanyDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('user_company_devices', function (Blueprint $table) {
            $table->enum('location_type', ['company', 'remote', 'other'])->nullable()->after('nickname');
            $table->boolean('auto_created')->default(false)->after('location_type')->comment('[true] = created by vitalERP. [false] = created by deviceWatch.'); // [true] = created by vitalERP. [false] created by deviceWatch.

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_company_devices', function (Blueprint $table) {
            $table->dropColumn(['location_type', 'auto_created']);
        });
    }
}
