<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
        Schema::create('user_companies_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger('user_id');
            $table->unsignedInteger('comp_id');
            $table->string('role');
            $table->unsignedInteger('assigned_by');
            $table->enum('action_type', ['assign', 'role_change', 'remove']);
            $table->timestamp('action_timestamp')->useCurrent();
            
            $table->boolean('rete_sync')->default(false);
            $table->boolean('watch_invited')->default(false);
            $table->timestamp('watch_invited_at')->nullable();

            $table->index('user_id');
            $table->index('comp_id');
        });

        // Create the AFTER INSERT trigger for assignments
        DB::unprepared('
            CREATE TRIGGER after_insert_user_company
            AFTER INSERT ON user_companies
            FOR EACH ROW
            BEGIN
                INSERT INTO user_companies_history (user_id, comp_id, role, assigned_by, action_type, action_timestamp, rete_sync, watch_invited, watch_invited_at)
                VALUES (NEW.user_id, NEW.comp_id, NEW.role, NEW.assigned_by, "assign", NOW(), NEW.rete_sync, NEW.watch_invited, NEW.watch_invited_at);
            END;
        ');

        // Create the AFTER UPDATE trigger for role changes
        DB::unprepared('
            CREATE TRIGGER after_update_user_company
            AFTER UPDATE ON user_companies
            FOR EACH ROW
            BEGIN
                IF NEW.role != OLD.role THEN
                    INSERT INTO user_companies_history (user_id, comp_id, role, assigned_by, action_type, action_timestamp, rete_sync, watch_invited, watch_invited_at)
                    VALUES (NEW.user_id, NEW.comp_id, NEW.role, NEW.assigned_by, "role_change", NOW(), NEW.rete_sync, NEW.watch_invited, NEW.watch_invited_at);
                END IF;
            END;
        ');

        // Create the BEFORE DELETE trigger for removals
        DB::unprepared('
            CREATE TRIGGER before_delete_user_company
            BEFORE DELETE ON user_companies
            FOR EACH ROW
            BEGIN
                INSERT INTO user_companies_history (user_id, comp_id, role, assigned_by, action_type, action_timestamp, rete_sync, watch_invited, watch_invited_at)
                VALUES (OLD.user_id, OLD.comp_id, OLD.role, OLD.assigned_by, "remove", NOW(), OLD.rete_sync, OLD.watch_invited, OLD.watch_invited_at);
            END;
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Drop the triggers
        DB::unprepared('DROP TRIGGER IF EXISTS after_insert_user_company');
        DB::unprepared('DROP TRIGGER IF EXISTS after_update_user_company');
        DB::unprepared('DROP TRIGGER IF EXISTS before_delete_user_company');

        Schema::dropIfExists('user_companies_history');
    }
};
