<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateRiskRegister001Table extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('risk_register_stds', function (Blueprint $table) {
            $table->boolean('poam')->default(false)->after('updated_by');
            $table->string('plan')->nullable()->after('poam');
            $table->timestamp('start_date')->nullable()->after('plan');
            $table->timestamp('completion_date')->nullable()->after('start_date');
            $table->timestamp('actual_compl_date')->nullable()->after('completion_date');
            $table->text('resolution')->nullable()->after('actual_compl_date');
            $table->string('artifact')->nullable()->after('resolution');
            $table->integer('pseverity')->nullable()->after('artifact');
            $table->integer('pprobabaility')->nullable()->after('pseverity');
            $table->integer('prisk_rating')->nullable()->after('pprobabaility');
            $table->unsignedInteger('poam_updated_by')->nullable()->after('prisk_rating');
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
            $table->dropColumn(['poam', 'plan', 'start_date', 'completion_date', 'actual_compl_date', 'resolution', 'artifact', 'pseverity', 'pprobabaility', 'prisk_rating', 'poam_updated_by']);
        });
    }
}
