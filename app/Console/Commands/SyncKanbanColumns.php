<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\KanbanColumn;
use App\Models\Project;
use Illuminate\Console\Command;

class SyncKanbanColumns extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'kanban-board:one-time-setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is one time command to setup kanban board columns for existing companies';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $companies = Company::get();

        if (count($companies) > 0) {
            foreach ($companies as $company) {
                if (!KanbanColumn::where(['comp_id' => $company->id])->first()) {
                    $company->kanban_columns()->create([
                        'strict_name' => 'todoTasks',
                        'default_name' => 'TODO',
                    ]);
                    $company->kanban_columns()->create([
                        'strict_name' => 'inprogressTasks',
                        'default_name' => 'Inprogress',
                    ]);
                    $company->kanban_columns()->create([
                        'strict_name' => 'waitingTasks',
                        'default_name' => 'Waiting',
                    ]);
                    $company->kanban_columns()->create([
                        'strict_name' => 'reviewTasks',
                        'default_name' => 'Review',
                    ]);
                    $company->kanban_columns()->create([
                        'strict_name' => 'doneTasks',
                        'default_name' => 'Done',
                    ]);
                }
            }
        }

        $projects = Project::get();

        if (count($projects) > 0) {
            foreach ($projects as $project) {
                if (!KanbanColumn::where(['project_id' => $project->id, 'comp_id' => $project->comp_id])->first()) {
                    $project->kanban_columns()->create([
                        'strict_name' => 'todoTasks',
                        'default_name' => 'TODO',
                        'comp_id' => $project->comp_id
                    ]);
                    $project->kanban_columns()->create([
                        'strict_name' => 'inprogressTasks',
                        'default_name' => 'Inprogress',
                        'comp_id' => $project->comp_id
                    ]);
                    $project->kanban_columns()->create([
                        'strict_name' => 'waitingTasks',
                        'default_name' => 'Waiting',
                        'comp_id' => $project->comp_id
                    ]);
                    $project->kanban_columns()->create([
                        'strict_name' => 'reviewTasks',
                        'default_name' => 'Review',
                        'comp_id' => $project->comp_id
                    ]);
                    $project->kanban_columns()->create([
                        'strict_name' => 'doneTasks',
                        'default_name' => 'Done',
                        'comp_id' => $project->comp_id
                    ]);
                }
            }
        }

        return 0;
    }
}
