<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\PolicyPortal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedPolicyPortal extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $accounts = Company::get();

        foreach($accounts as $company)
        {
            if(!PolicyPortal::where(['comp_id' => $company->id])->first())
            {
                $company->policy_portal()->create();
            }
        }
    }
}
