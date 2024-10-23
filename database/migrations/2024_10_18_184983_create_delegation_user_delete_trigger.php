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
            CREATE TRIGGER trg_delegation_user_delete
            AFTER DELETE ON delegation_users
            FOR EACH ROW
            BEGIN
                DECLARE EXIT HANDLER FOR SQLEXCEPTION
                BEGIN
                    -- Log the error details into the error_log table
                    INSERT INTO error_log (table_name, operation, error_message)
                    VALUES (\'delegation_users\', \'DELETE\', \'Error occurred during delete operation\');
                END;
                
                -- Normal trigger operation
                INSERT INTO delegation_histories (delegation_id, user_id, action, action_by, action_date)
                VALUES (OLD.delegation_id, OLD.user_id, \'removed\', (SELECT delegated_by FROM delegations WHERE delegation_id = OLD.delegation_id), NOW());
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS trg_delegation_user_delete');
    }
};
