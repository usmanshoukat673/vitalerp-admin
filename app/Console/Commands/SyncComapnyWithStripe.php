<?php

namespace App\Console\Commands;

use App\Models\Company;
use Illuminate\Console\Command;

class SyncComapnyWithStripe extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'stripe:sync_non_stripe_customers';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This command will help you get existing customer sync with stripe';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $company = Company::find(1);

        $company->createStripeAccount();

        return Command::SUCCESS;
    }
}
