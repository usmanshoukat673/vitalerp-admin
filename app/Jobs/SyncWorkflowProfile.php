<?php

namespace App\Jobs;

use App\Models\ReteCategories;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Models\RetePredefinedWorkflows;
use App\Models\ReteWorkflowCategories;

class SyncWorkflowProfile implements ShouldQueue
{

    protected $client, $workflow;

    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($workflow)
    {
        $this->workflow = $workflow;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->client = new Client(['base_uri' => 'https://api.n8n.io/']);

        try {

            $request = $this->client->request('GET', 'templates/workflows/' . $this->workflow->id);

            $response = $request ? $request->getBody()->getContents() : null;
            $status = $request ? $request->getStatusCode() : 500;

        if ($response && $status === 200 && $response !== 'null') {
            $response = json_decode($response);
             $response = $response->workflow;
             $this->workflow->nodes = $response->nodes;
             $this->workflow->workflow = $response->workflow;
             $this->workflow->workflowInfo = $response->workflowInfo;
             $this->workflow->image = $response->image;
             $this->workflow->description = $response->description;
             $this->workflow->views = $response->views;
             $this->workflow->save();

             if(count($response->categories) > 0)
             {
                 foreach ($response->categories as $category) {
                     $this->assignCategory($category, $this->workflow);
                 }
             }
        }

        } catch (ClientException $e) {
            logger($e->getMessage());
        }
    }

    protected function assignCategory($category, $workflow)
    {
        if(!ReteCategories::find($category->id))
        {
            ReteCategories::create([
                'id' => $category->id,
                'name' => $category->name,
            ]);
        }

        if(!ReteWorkflowCategories::where([
            'category_id' => $category->id,
            'workflow_id' => $workflow->id,
        ])->first()){
            ReteWorkflowCategories::create([
                'category_id' => $category->id,
                'workflow_id' => $workflow->id,
            ]);
        }
    }
}
