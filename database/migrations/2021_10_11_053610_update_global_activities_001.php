<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateGlobalActivities001 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('global_activities', function (Blueprint $table) {
            $table->bigInteger('subject_id')->nullable()->after('page');
            $table->string('subject_type')->nullable()->after('subject_id');
            $table->text('description')->nullable()->after('subject_type');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('global_activities', function (Blueprint $table) {
            $table->dropColumn('subject_id', 'subject_type', 'description');
        });
    }
}
