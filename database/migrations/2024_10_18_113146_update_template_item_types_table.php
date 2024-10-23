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
        Schema::table('template_item_types', function (Blueprint $table) {
            $table->unsignedBigInteger('comp_id')->nullable();
            $table->unsignedBigInteger('created_by')->nullable()->after('comp_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('template_item_types', function (Blueprint $table) {
            $table->dropColumn('comp_id', 'created_by');
        });
    }
};
