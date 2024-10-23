<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\CompanyLocation;
use App\Models\UserLocation;
use Illuminate\Console\Command;

class SetCompanyLocations extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'run-location:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is one time command to setup compnay locations for existing companies';

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
     * @return int
     */
    public function handle()
    {
        $companies = Company::get();

        if (count($companies) > 0) {
            foreach ($companies as $company) {
                if (!CompanyLocation::where(['comp_id' => $company->id])->first()) {
                    $location = CompanyLocation::create([
                        'comp_id' => $company->id,
                        'name' => $company->name,
                        'created_by' => $company->created_by,
                        'address' => $company->address,
                        'city' => $company->city,
                        'state' => $company->state,
                        'country' => $company->country,
                        'postal_code' => $company->postal_code,
                        'timezone' => $company->timezone,
                        'default' => true
                    ]);

                    $this->assignLocation($location->id, $company->id, $company->created_by);
                }
            }
        }

        return 'Location setup finished!';
    }

    protected function assignLocation($location_id, $comp_id, $user_id)
    {
        return UserLocation::create([
            'user_id' => $user_id,
            'comp_id' => $comp_id,
            'assigned_by' => $user_id,
            'location_id' => $location_id,
            'default' => true
        ]);
    }
}
