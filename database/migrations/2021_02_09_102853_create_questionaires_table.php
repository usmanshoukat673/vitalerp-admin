<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionairesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questionaires', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('question_id')->index();
            $table->unsignedInteger('control_id')->index();
            $table->unsignedInteger('section_id')->index();
            $table->unsignedInteger('standard_id')->index();
            $table->unsignedInteger('comp_id')->index();
            $table->boolean('required')->default(false);
            $table->integer('parent')->nullable()->unsigned()->index(); // question_id
            $table->boolean('applicable')->default(true);
            $table->string('yes_no')->nullable();
            $table->text('fill_in')->nullable();
            $table->integer('document_id')->unsigned()->nullable()->index();
            $table->string('question_type');
            $table->text('explanation')->nullable();
            $table->integer('ans_by')->unsigned()->nullable()->index();
            $table->timestamp('ans_at')->nullable();
            $table->boolean('answered')->default(false);
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
        Schema::dropIfExists('questionaires');
    }
}
