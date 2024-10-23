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
        Schema::table('documents', function (Blueprint $table) {
            $table->integer('review_by')->nullable()->index()->after('doc_ref');
            $table->timestamp('review_at')->useCurrent()->after('review_by');
            $table->integer('next_review_by')->nullable()->index()->after('review_at');
            $table->timestamp('next_review_at')->useCurrent()->after('next_review_by');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('documents', function (Blueprint $table) {
            $table->dropColumn('review_by', 'review_at', 'next_review_by', 'next_review_at');
        });
    }
};
