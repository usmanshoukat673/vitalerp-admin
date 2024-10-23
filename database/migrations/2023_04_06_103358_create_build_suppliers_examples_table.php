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
        Schema::create('build_suppliers_examples', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('build_supplier_id')->index();
            $table->string('name');
            $table->unsignedInteger('standard_id')->index();
            $table->boolean('selected')->default(true);
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
        Schema::dropIfExists('build_suppliers_examples');
    }
};
