<?php

namespace App\Console\Commands;

use App\Helpers\TextHelper;
use App\Models\Company;
use Illuminate\Console\Command;

class AssignCompassEmailToCompanies extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'compass:assign-email-to-existing-orgs';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Use this command to assign compass random email to all existing or new orgnasation if not already assigned';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $companies = Company::get();

        if (count($companies) > 0) {
            foreach ($companies as $company) {
                if ($company->compass_email == null) {
                    $company->compass_email = TextHelper::generateEmail($company->name, $company->id);
                    $company->save();
                }
            }
        }
        
        return Command::SUCCESS;
    }
}
