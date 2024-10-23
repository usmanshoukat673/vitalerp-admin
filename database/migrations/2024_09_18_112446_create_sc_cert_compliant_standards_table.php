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
        Schema::create('sc_cert_compliant_standards', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('security_certification_id');
            $table->unsignedBigInteger('quaility_cert_id');
            $table->timestamps();

            $table->unique(['security_certification_id', 'quaility_cert_id'])->name('scqc_unique');

            $table->foreign('security_certification_id')->references('id')->on('security_certifications')->onDelete('cascade')->name('scqc_sc_id_foreign');
            $table->foreign('quaility_cert_id')->references('id')->on('quality_certs')->onDelete('cascade')->name('scqc_quaility_cert_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sc_cert_compliant_standards');
    }
};
