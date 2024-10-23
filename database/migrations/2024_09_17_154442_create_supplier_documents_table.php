<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('supplier_documents', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('parent')->nullable();
            $table->string('name');
            $table->string('slug');
            $table->string('size');
            $table->string('ext');
            $table->enum('type', ['folder', 'file'])->default('folder');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade')->name('sd_supplier_id_foreign');
            $table->foreign('parent')->references('id')->on('supplier_documents')->onDelete('set null')->name('sd_parent_foreign');
            $table->foreign('created_by')->references('id')->on('users')->onDelete('set null')->name('sd_created_by_foreign');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('set null')->name('sd_updated_by_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplier_documents');
    }
};
