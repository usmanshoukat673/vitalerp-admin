<?php

namespace App\Console\Commands;

use App\Models\Company;
use Illuminate\Console\Command;

class SyscEmailsFolder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'compass:assign-emails-folder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Use this command to assign default emails folder for the existing companies';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $comapnies = Company::get();

        if(count($comapnies) > 0)
        {
            foreach($comapnies as $company)
            {
                if(!$company->documents()->where(['emails_folder' => true])->first())
                {
                    $company->documents()->create(
                        ['name' => 'Email Attachments', 'created_by' => $company->created_by, 'emails_folder' => true, 'type' => 'folder']
                    );
                }
            }
        }

        return Command::SUCCESS;
    }
}
