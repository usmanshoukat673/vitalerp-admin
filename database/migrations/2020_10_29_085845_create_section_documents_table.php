<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSectionDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('section_documents', function (Blueprint $table) {
            $table->unsignedInteger('section_id')->index();
            $table->unsignedInteger('document_id')->index();
            $table->unsignedInteger('comp_id')->index();
            $table->unsignedInteger('standard_id')->index();
            $table->unsignedInteger('assign_by')->nullable();
            $table->timestamps();

            $table->primary(['section_id', 'document_id', 'comp_id', 'standard_id'], 'sdcc_primary');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('section_documents');
    }
}
