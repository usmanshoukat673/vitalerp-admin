<?php

namespace App\Console\Commands;

use App\Jobs\SyncWorkflowProfile;
use App\Models\ReteCategories;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Models\RetePredefinedWorkflows;
use App\Models\ReteWorkflowCategories;

class SyncReteWorkflowProfile extends Command
{
    protected $client;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rete:sync-workflow-profile';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get predifed workflow profile from rete and sync into motion database based on given workflow id';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->client = new Client(['base_uri' => 'https://api.n8n.io/']);
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $workflows = RetePredefinedWorkflows::all();

        if(count($workflows) > 0)
        {
            foreach ($workflows as $workflow) {

                SyncWorkflowProfile::dispatch($workflow);

            }
        }


        return 0;
    }


}
