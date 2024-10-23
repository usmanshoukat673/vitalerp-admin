<?php

namespace App\Console\Commands;

use App\Events\StandardSubscriptionProcessed;
use Illuminate\Console\Command;

class testOpeartions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test-opeartion:commad-sepearated-string';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        // $test = 'Biometric Authentication Devices, Access Control Cards, Firewall Appliances';

        // var_dump(explode(",", $test));

        // StandardSubscriptionProcessed::dispatch(26);

        event(new StandardSubscriptionProcessed(17));

        return Command::SUCCESS;
    }
}
