<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('slug');
            $table->integer('comp_id')->nullable()->unsigned();
            $table->integer('parent')->nullable()->unsigned();
            $table->string('ext')->nullable();
            $table->integer('size')->nullable();
            $table->enum('type', ['folder', 'file'])->default('folder');
            $table->longText('content')->nullable();
            $table->boolean('is_default')->default(false);
            $table->integer('created_by')->nullable()->unsigned();
            $table->integer('updated_by')->nullable()->unsigned();
            $table->timestamps();

            $table->foreign('parent')
                ->references('id')->on('documents')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('documents');
    }
}
