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
        Schema::table('comp_ctrl_docs', function (Blueprint $table) {
            $table->enum('source', ['created', 'linked', 'uploaded', 'converted'])->nullable()->after('pp_visiblity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('comp_ctrl_docs', function (Blueprint $table) {
            $table->dropColumn('source');
        });
    }
};
