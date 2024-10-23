<?php

namespace App\Console\Commands;

use App\Models\FileManager\Document;
use Illuminate\Console\Command;

class SyncTaskFilesFolder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'temp-command-task:sync-default-task-folder-for-old-companies';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'One time use command';

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
        // $default_docs = Document::where(['is_default' => 1])->get();

        // if(count($default_docs) > 0)
        // {
        //     foreach ($default_docs as $doc) {
        //         Document::create([
        //             'name' => 'Task Files', 'created_by' => $doc->created_by, 'task_folder' => true, 'type' => 'folder', 'comp_id' => $doc->comp_id
        //         ]);
        //     }
        // }
        return 0;
    }
}
