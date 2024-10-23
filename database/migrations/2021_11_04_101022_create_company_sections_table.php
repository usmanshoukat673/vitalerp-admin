<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanySectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedInteger('section_id');
            $table->unsignedInteger('parent')->nullable(); // if the section is parent then set null else set section id
            $table->unsignedInteger('standard_id');
            $table->boolean('enable')->default(true);
            $table->enum('owner_authority', ['users', 'teams', 'thirdparty'])->default('users');
            $table->enum('custodian_authority', ['users', 'teams', 'thirdparty'])->default('users');
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
        Schema::dropIfExists('company_sections');
    }
}
