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
        Schema::create('question_comments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('company_control_question_id');
            $table->unsignedBigInteger('comp_id');
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->text('comment');
            $table->unsignedBigInteger('commented_by');
            $table->timestamp('date_commented')->useCurrent();
            $table->timestamp('deleted_at')->nullable();

            $table->foreign('company_control_question_id')->references('id')->on('company_control_questions')->onDelete('cascade');
            $table->foreign('comp_id')->references('id')->on('companies')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('question_comments')->onDelete('cascade');
            $table->foreign('commented_by')->references('id')->on('users')->onDelete('cascade');

            $table->index('company_control_question_id');
            $table->index('comp_id');
            $table->index('parent_id');
            $table->index('commented_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('question_comments');
    }
};
