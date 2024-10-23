<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Whistleblow;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssignWhistleToOldAccounts extends Seeder
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
            if(!Whistleblow::where(['comp_id' => $company->id])->first())
            {
                $company->whistle()->create();
            }
        }
    }
}
