<?php

namespace App\Console\Commands;

use App\Models\RetePredefinedWorkflows;
use Carbon\Carbon;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class SyncReteWorkflows extends Command
{

    protected $client;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rete:sync-workflows';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get predifed workflows from rete and synch into motion database based on given categories';

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
        try {
            $request = $this->client->request('GET', 'templates/workflows?skip=0&rows=500&category=&search=');

            $response = $request ? $request->getBody()->getContents() : null;
            $status = $request ? $request->getStatusCode() : 500;

        if ($response && $status === 200 && $response !== 'null') {
            $response = json_decode($response);

            if(count($response->workflows) > 0)
            {
                foreach ($response->workflows as $workflow) {
                    $this->addWorkflow($workflow);
                }
            }
        }

        } catch (ClientException $e) {
            logger($e->getMessage());
        }

        return 0;
    }

    protected function addWorkflow($workflow)
    {
        $existing_workflow = RetePredefinedWorkflows::where(['id' => $workflow->id])->first();

        if($existing_workflow)
        {
            $existing_workflow->name = $workflow->name;
            $existing_workflow->recentViews = $workflow->recentViews;
            $existing_workflow->totalViews = $workflow->totalViews;
            $existing_workflow->nodes = $workflow->nodes;
            $existing_workflow->user = $workflow->user;
            $existing_workflow->save();
        }
        else{
            $date = new Carbon($workflow->createdAt);
            RetePredefinedWorkflows::create([
                'id' => $workflow->id,
                'name' => $workflow->name,
                'createdAt' => $date->toDateTimeString(),
                'created_at' => $date->toDateTimeString(),
                'nodes' => $workflow->nodes,
                'recentViews' => $workflow->recentViews,
                'totalViews' => $workflow->totalViews,
                'user' => $workflow->user
            ]);
        }
    }
}
