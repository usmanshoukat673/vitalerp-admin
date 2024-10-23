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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id('assignment_id');
            $table->unsignedBigInteger('comp_id');
            $table->unsignedBigInteger('domain_id')->nullable();
            $table->unsignedBigInteger('subdomain_id')->nullable();
            $table->unsignedBigInteger('control_id')->nullable();
            $table->unsignedBigInteger('question_id')->nullable();
            $table->unsignedBigInteger('assigned_by');
            $table->timestamp('assignment_date')->useCurrent();

            // Foreign keys
            $table->foreign('comp_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('domain_id')->references('id')->on('standard_sections')->onDelete('set null');
            $table->foreign('subdomain_id')->references('id')->on('standard_sections')->onDelete('set null');
            $table->foreign('control_id')->references('id')->on('section_controls')->onDelete('set null');
            $table->foreign('question_id')->references('id')->on('control_questions')->onDelete('set null');
            $table->foreign('assigned_by')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};