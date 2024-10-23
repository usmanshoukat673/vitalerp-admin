<?php

namespace App\Console\Commands;

use App\Jobs\SyncReteCategoriesWorkflows;
use App\Models\ReteCategories;
use App\Models\RetePredefinedWorkflows;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class SyncReteWorkflowsWithCategories extends Command
{
    protected $client;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rete:sync-workflows-with-categories';

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
        $categories = ReteCategories::select('id')->get();

        if(count($categories) > 0)
        {
            foreach ($categories as $category) {
               SyncReteCategoriesWorkflows::dispatch($category->id);
            }
        }

        return 0;
    }
}
