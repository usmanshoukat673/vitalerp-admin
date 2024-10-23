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
        Schema::create('corporate_information', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedBigInteger('supplier_id');
            $table->string('name')->nullable();
            $table->string('another_name')->nullable();
            $table->boolean('parent_organization')->nullable();
            $table->string('parent_organization_name')->nullable();
            $table->string('established_year', 4)->nullable();
            $table->string('entity_type')->nullable();
            $table->string('registration_state')->nullable();
            $table->boolean('usa_owned_entity')->nullable();
            $table->boolean('foreign_ownership')->nullable();
            $table->string('uei_code')->nullable();
            $table->string('cage_code')->nullable();
            $table->string('duns_number')->nullable();
            $table->string('business_web_page')->nullable();
            $table->string('full_time_employees')->nullable();
            $table->string('average_annual_revenue')->nullable();
            $table->boolean('dcaa_approved')->nullable();
            $table->text('special_awards')->nullable();
            $table->text('other_comments')->nullable();
            $table->unsignedBigInteger('sup_doc_id')->nullable();

            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();

            $table->foreign('comp_id')->references('id')->on('companies')->onDelete('cascade')->name('ci_comp_id_foreign');
            $table->foreign('supplier_id')->references('id')->on('suppliers')->onDelete('cascade')->name('ci_supplier_id_foreign');
            $table->foreign('updated_by')->references('id')->on('users')->onDelete('cascade')->name('ci_updated_by_foreign');
            $table->foreign('sup_doc_id')->references('id')->on('supplier_documents')->onDelete('set null')->name('ci_sup_doc_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('corporate_information');
    }
};
