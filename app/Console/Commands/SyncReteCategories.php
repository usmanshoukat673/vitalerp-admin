<?php

namespace App\Console\Commands;

use App\Models\ReteCategories;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class SyncReteCategories extends Command
{

    protected $client;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rete:sync-categories';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get categories from rete and sync into Motion database';

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

            $request = $this->client->request('GET', 'templates/categories');

            $response = $request ? $request->getBody()->getContents() : null;
            $status = $request ? $request->getStatusCode() : 500;

        if ($response && $status === 200 && $response !== 'null') {
            $response = json_decode($response);

            if(count($response->categories) > 0)
            {
                foreach ($response->categories as $category) {
                   $this->addCategory($category->id, $category->name);
                }
            }
        }

        } catch (ClientException $e) {
            logger($e->getMessage());
        }

        return 0;
    }

    protected function addCategory($id, $name)
    {
        $category = ReteCategories::where(['id' => $id, 'name' => $name])->first();

        if($category)
        {
            $category->name = $name;
            $category->save();
        }
        else{
            ReteCategories::create(['id' => $id, 'name' => $name]);
        }
    }
}
