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
        Schema::create('supplier_labor_category_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('supplier_id');
            $table->unsignedBigInteger('domain_id');
            $table->unsignedBigInteger('labor_category_id');
            $table->boolean('past_performance')->default(false);
            $table->date('last_date_performed_services')->nullable();
            $table->float('max_num_on_one_contract')->nullable();
            $table->string('customer_type')->nullable();
            $table->integer('service_rating')->nullable();
            $table->timestamps();

            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade')->name('slcd_supplier_id_foreign');
            $table->foreign('domain_id')->references('id')->on('domains')->onDelete('cascade')->name('slcd_domain_id_foreign');
            $table->foreign('labor_category_id')->references('id')->on('labor_categories')->onDelete('cascade')->name('slcd_labor_category_id_foreign');

            $table->unique(['supplier_id', 'domain_id', 'labor_category_id'])->name('slcd_supplier_domain_labor_category_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    { 
        Schema::dropIfExists('supplier_labor_category_details');
    }
};
