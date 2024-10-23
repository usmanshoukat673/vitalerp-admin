<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\User;
use Illuminate\Console\Command;

class SyncCompanyEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'company:sync-email-addresses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get email address of a user who have created a company, later user can decide update the email address.';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $comapnies = Company::select('id', 'name', 'email', 'created_by')->get();

        foreach ($comapnies as $company) {
            if ($company->email == null) {
                $user = User::find($company->created_by);

                if ($user) {
                    $company->email = $user->email;
                    $company->save();
                }
            }
        }
        return Command::SUCCESS;
    }
}
