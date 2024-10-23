<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateDevices001Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('watch_devices', function (Blueprint $table) {
            $table->string('os_major_version')->nullable()->after('operating_system');
            $table->string('os_minor_version')->nullable()->after('os_major_version');
            $table->string('os_patch_version')->nullable()->after('os_minor_version');
            $table->string('browser')->nullable()->after('os_patch_version');
            $table->string('browser_major_version')->nullable()->after('browser');
            $table->string('browser_minor_version')->nullable()->after('browser_major_version');
            $table->string('browser_patch_version')->nullable()->after('browser_minor_version');
            $table->enum('platform', ['mac', 'windows', 'linux', 'android', 'ios'])->nullable()->after('other');
            $table->boolean('auto_created')->default(false)->after('platform')->comment('[true] = created by vitalERP. [false] = created by deviceWatch.'); // [true] = created by vitalERP. [false] created by deviceWatch.
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
            $table->dropColumn(['os_major_version', 'os_minor_version', 'os_patch_version', 'browser', 'browser_major_version', 'browser_minor_version', 'browser_patch_version', 'platform', 'auto_created']);
        });
    }
}
