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
        Schema::create('delegation_users', function (Blueprint $table) {
            $table->id('delegation_user_id');
            $table->unsignedBigInteger('delegation_id');
            $table->unsignedBigInteger('user_id');

            // Foreign keys
            $table->foreign('delegation_id')->references('delegation_id')->on('delegations')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

            // Indexes
            $table->index('delegation_id');
            $table->index('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('delegation_users');
    }
};
