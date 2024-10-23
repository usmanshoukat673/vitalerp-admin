<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedPrimeContract extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contacts = [
            ['name' => 'No prime contracts'],
            ['name' => 'Primed 1-3 contracts for U.S. Federal Government'],
            ['name' => 'Primed 1-3 contracts for Non-U.S. Federal Government'],
            ['name' => 'Primed 4 or more contracts for U.S. Federal Government'],
            ['name' => 'Primed 4 or more contracts for Non-U.S. Federal Government'],
            ['name' => 'Primed 1 or more contracts for Federal Government Overseas'],
            ['name' => 'Prime contractor on U.S. commercial / state or local government contract'],
            ['name' => 'Prime contractor on Non-U.S. commercial / state or local government contract'],
            ['name' => 'Prime contractor where we were subcontract to you'],
        ];

        foreach ($contacts as $contact) {
            \App\Models\PrimeContract::firstOrCreate($contact);
        }
    }
}
