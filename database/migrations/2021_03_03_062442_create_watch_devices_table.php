<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateWatchDevicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('watch_devices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('operating_system'); // machine/device name
            $table->string('machine_name')->nullable(); // machine/device name
            $table->boolean('status')->default(true);
            $table->string('username')->nullable();
            $table->string('user_domain_name')->nullable();
            $table->string('system_directory')->nullable(); //
            $table->string('device_encrypted')->nullable(); // true false
            $table->string('antivirus_status')->nullable(); // ??
            $table->string('windows_defender')->nullable(); // true of false
            $table->string('anti_virus_apps')->nullable();
            $table->string('domain_firewall')->nullable();
            $table->string('private_firewall')->nullable();
            $table->string('public_firewall')->nullable();
            $table->string('public_ip');
            $table->string('private_ip')->nullable();
            $table->string('msoffice_version')->nullable();
            $table->text('browsers')->nullable(); // [{name: 'Brave', version: '89.1.22.70'}, {name: 'Google Chrome', version: '9.0.4389.90'}]
            $table->text('other')->nullable(); // if any other will be acceptable in json format
            $table->timestamps();

            $table->foreign('user_id')
                ->references('id')->on('users')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('watch_devices');
    }
}
