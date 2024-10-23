<?php

namespace App\Console\Commands;

use App\Jobs\FreshserviceLookup;
use App\Models\Freshservice\Freshservice;
use Illuminate\Console\Command;

class FreshserviceRefresher extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'freshservice:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync and realod freshservice data.';

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
     * @return mixed
     */
    public function handle()
    {
        $freshservices = Freshservice::where(['expired' => 0])->get();
        if (count($freshservices) > 0) {
            foreach ($freshservices as $freshservice) {
                FreshserviceLookup::dispatch($freshservice);
            }
        }
    }
}
