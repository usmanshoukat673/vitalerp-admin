<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOwnerTeamSectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('owner_team_sections', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('team_id');
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
        Schema::dropIfExists('owner_team_sections');
    }
}