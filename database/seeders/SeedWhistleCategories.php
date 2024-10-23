<?php

namespace Database\Seeders;

use App\Models\WhistleCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedWhistleCategories extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        WhistleCategory::create([
            'name' => 'Suspected Data Breach'
        ]);

        WhistleCategory::create([
            'name' => 'Bullying'
        ]);

        WhistleCategory::create([
            'name' => 'Sexual Harassment'
        ]);

        WhistleCategory::create([
            'name' => 'Discrimination'
        ]);

        WhistleCategory::create([
            'name' => 'Occupational Health and Safety'
        ]);

        WhistleCategory::create([
            'name' => 'Non-compliance with Company Policies'
        ]);

        WhistleCategory::create([
            'name' => 'Theft, Corruption or Embezzlement'
        ]);

        WhistleCategory::create([
            'name' => 'Environmental'
        ]);

        WhistleCategory::create([
            'name' => 'Damage to Property'
        ]);

        WhistleCategory::create([
            'name' => 'Physical Aggression'
        ]);

        WhistleCategory::create([
            'name' => 'Violation of Law'
        ]);

        WhistleCategory::create([
            'name' => 'Other'
        ]);
    }
}
