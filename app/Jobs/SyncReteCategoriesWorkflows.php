<?php

namespace App\Jobs;

use App\Models\RetePredefinedWorkflows;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class SyncReteCategoriesWorkflows implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $client, $category_id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($category_id)
    {
        $this->category_id = $category_id;
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
            $request = $this->client->request('GET', 'templates/workflows?skip=0&rows=1000&category='.$this->category_id.'&search=');

            $response = $request ? $request->getBody()->getContents() : null;
            $status = $request ? $request->getStatusCode() : 500;

        if ($response && $status === 200 && $response !== 'null') {
            $response = json_decode($response);

            if(count($response->workflows) > 0)
            {
                foreach ($response->workflows as $workflow) {
                    $this->addWorkflow($this->category_id, $workflow);
                }
            }
        }

        } catch (ClientException $e) {
            logger($e->getMessage());
        }
    }

    // protected function getWorkflows($category_id, $totalWorkflows)
    // {
    //     $initial_round = 0;
    //     while ($initial_round <= $totalWorkflows) {
    //         logger('templates/workflows?skip='.$initial_round.'&rows=10&category='.$category_id.'&search=');
    //         try {
    //             $request = $this->client->request('GET', 'templates/workflows?skip='.$initial_round.'&rows=10&category='.$category_id.'&search=');

    //                 $response = $request ? $request->getBody()->getContents() : null;
    //                 $status = $request ? $request->getStatusCode() : 500;

    //             if ($response && $status === 200 && $response !== 'null') {
    //                 $response = json_decode($response);

    //                 if(count($response->workflows) > 0)
    //                 {
    //                     foreach ($response->workflows as $workflow) {
    //                         $this->addWorkflow($category_id, $workflow);
    //                     }
    //                 }

    //                 $initial_round = $initial_round + 10;
    //             }

    //             } catch (ClientException $e) {
    //                 logger($e->getMessage());
    //             }

    //     }
    // }

    protected function addWorkflow($category_id, $workflow)
    {
        $existing_workflow = RetePredefinedWorkflows::where(['id' => $workflow->id, 'category_id' => $category_id])->first();

        if($existing_workflow)
        {
            $existing_workflow->name = $workflow->name;
            $existing_workflow->recentViews = $workflow->recentViews;
            $existing_workflow->totalViews = $workflow->totalViews;
            $existing_workflow->nodes = json_encode($workflow->nodes);
            $existing_workflow->user = json_encode($workflow->user);
            $existing_workflow->save();
        }
        else{
            RetePredefinedWorkflows::create([
                'id' => $workflow->id,
                'category_id' => $category_id,
                'name' => $workflow->name,
                'createdAt' => $workflow->createdAt,
                'nodes' => json_encode($workflow->nodes),
                'recentViews' => $workflow->recentViews,
                'totalViews' => $workflow->totalViews,
                'user' => json_encode($workflow->user)
            ]);
        }
    }
}
