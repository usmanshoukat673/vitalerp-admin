<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE TRIGGER trg_assignment_user_insert
            AFTER INSERT ON assignment_users
            FOR EACH ROW
            BEGIN
                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                BEGIN
                    -- Log the error details into the error_log table
                    INSERT INTO error_log (table_name, operation, error_message)
                    VALUES (\'assignment_users\', \'INSERT\', \'Error occurred during insert operation\');
                END;
                
                -- Normal trigger operation
                INSERT INTO assignment_histories (assignment_id, user_id, action, action_by, action_date)
                VALUES (NEW.assignment_id, NEW.user_id, \'assigned\', (SELECT assigned_by FROM assignments WHERE assignment_id = NEW.assignment_id), NOW());
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS trg_assignment_user_insert');
    }
};
