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
        Schema::create('company_control_questions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('comp_id');
            $table->unsignedInteger('control_id');
            $table->unsignedBigInteger('question_id');
            $table->unsignedInteger('section_id');
            $table->unsignedInteger('standard_id');
            $table->enum('status', ['Implemented', 'Partially Implemented', 'Not Implemented', 'Excluded', 'Not Applicable'])->nullable()->default('Not Implemented');
            $table->text('justification')->nullable();
            $table->longText('notes')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('company_control_questions');
    }
};
