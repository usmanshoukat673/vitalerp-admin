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
        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('due_date', 'end_date');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->timestamp('start_date')->nullable()->after('description');
            $table->string('url')->nullable()->after('end_date');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('projects', function (Blueprint $table) {
            $table->renameColumn('end_date', 'due_date');
        });

        Schema::table('projects', function (Blueprint $table) {
            $table->dropColumn('start_date', 'url');
        });
    }
};
