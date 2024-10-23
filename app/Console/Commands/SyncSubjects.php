<?php

namespace App\Console\Commands;

use App\Models\Project;
use App\Models\Subject;
use Illuminate\Console\Command;

class SyncSubjects extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subjects:init';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Assign a subject to each and every project from the entire system';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $projects = Project::all();

        $subject = new Subject();
        
        if(count($projects) > 0)
        {
            foreach($projects as $project)
            {
                $subject->create([
                    'project_id' => 1,
                    'subject_type' => 1,
                    'created_by' => 1,
                    'comp_id' => 1
                ]);
            }
        }

        return Command::SUCCESS;
    }
}
