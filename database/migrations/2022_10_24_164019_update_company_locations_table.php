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
        Schema::table('company_locations', function (Blueprint $table) {
            $table->string('website')->nullable()->after('postal_code');
            $table->string('office_phone')->nullable()->after('website');
            $table->string('contact_person')->nullable()->after('office_phone');
            $table->string('contact_person_email')->nullable()->after('contact_person');
            $table->string('contact_person_phone')->nullable()->after('contact_person_email');
            $table->string('reference')->nullable()->after('contact_person_phone');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('company_locations', function (Blueprint $table) {
            $table->dropColumn('website', 'office_phone', 'contact_person', 'contact_person_phone', 'contact_person_email', 'reference');
        });
    }
};
