<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedSocioEconomics extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list = [
            ['name' => 'Small Business'],
            ['name' => 'AbilityOne Program'],
            ['name' => 'Alaskan Native Corporation (ANC)'],
            ['name' => 'Disability Owned'],
            ['name' => 'Economically Disadvantaged Woman Owned Business (EDWOSB)'],
            ['name' => 'Foreign'],
            ['name' => 'Historical Black College or University (HBCU)'],
            ['name' => 'Large Business'],
            ['name' => 'Lesbian, Gay,  Bisexual, Transgender and Questioning (LGBTQ+)'],
            ['name' => 'Minority Serving Educational Institution (MI)'],
            ['name' => 'Native American'],
            ['name' => 'Native Hawaiian'],
            ['name' => 'Native Hawaiian Organization'],
            ['name' => 'Minority Owned - Large'],
            ['name' => 'Minority Owned - Small'],
            ['name' => 'Non-Profit Agency'],
            ['name' => 'SBA Certified 8(a)'],
            ['name' => 'SBA Certified HUBZone'],
            ['name' => 'Service Disabied Veteran Owned Business (SDVOSB)'],
            ['name' => 'Small Disadvantaged Business (SDB)'],
            ['name' => 'Tribally Owned'],
            ['name' => 'Veteran Owned Large'],
            ['name' => 'Veteran Owned Small Business'],
            ['name' => 'SBA Certified Service-Disabled Veteran-Owned Small Business (SDVSB)'],
            ['name' => 'SBA Certified Veteran-Owned Small Business (VOSB)'],
            ['name' => 'SBA Certified Woman Owned Business (WOSB)'],
            ['name' => 'Woman-Owned Business'],
        ];

        foreach ($list as $item) {
            \App\Models\Socioeconomic::firstOrCreate($item);
        }
    }
}
