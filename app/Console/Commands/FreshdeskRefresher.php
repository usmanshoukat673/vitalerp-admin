<?php

namespace App\Console\Commands;

use App\Models\Freshdesk;
use App\Jobs\FreshdeskLookup;
use Illuminate\Console\Command;

class FreshdeskRefresher extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'freshdesk:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync and realod freshdesk agents.';

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
        $freshdesks = Freshdesk::where(['expired' => 0])->get();
        if (count($freshdesks) > 0) {
            foreach ($freshdesks as $freshdesk) {
                FreshdeskLookup::dispatch($freshdesk);
            }
        }
    }
}
