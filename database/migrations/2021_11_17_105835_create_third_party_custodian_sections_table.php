<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateThirdPartyCustodianSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tpy_custodian_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tp_id'); // Third Party ID @thirdparty
            $table->unsignedBigInteger('comp_id');
            $table->unsignedInteger('section_id');
            $table->unsignedInteger('parent')->nullable(); // if the section is parent then set null else set section id
            $table->unsignedInteger('standard_id');
            $table->unsignedBigInteger('assigned_by')->nullable();
            $table->boolean('enable')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tpy_custodian_sections');
    }
}
