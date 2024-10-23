<?php

namespace App\Console\Commands;

use App\Jobs\MFARemindProcessor;
use App\Models\RetePredefinedWorkflows;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class DateCleanUp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rete:clean-dates';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

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
        // $workflows = RetePredefinedWorkflows::select('id', 'createdAt')->get();

        foreach ($workflows as $workflow) {
            $date = new Carbon($workflow->createdAt);

            $workflow->created_at = $date->toDateTimeString();
            $workflow->save();
        }

        // $user = User::find(1);

        // MFARemindProcessor::dispatch($user);


        return 0;
    }
}
