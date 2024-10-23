<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedQualityCerts extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list = [
            ['name' => 'CMMI for Services Level 1'],
            ['name' => 'CMMI for Services Level 2'],
            ['name' => 'CMMI for Services Level 3'],
            ['name' => 'CMMI for Services Level 4'],
            ['name' => 'CMMI for Services Level 5'],
            ['name' => 'CMMI for Development Level 1'],
            ['name' => 'CMMI for Development Level 2'],
            ['name' => 'CMMI for Development Level 3'],
            ['name' => 'CMMI for Development Level 4'],
            ['name' => 'CMMI for Development Level 5'],
            ['name' => 'ISO9001'],
            ['name' => 'AS9100'],
            ['name' => 'AS9120'],
            ['name' => 'Federal Aviation Regulation (FAR) 145AS9110'],
            ['name' => 'Federal Aviation Regulation (FAR) Part 21'],
            ['name' => 'ISO 20000'],
            ['name' => 'ISO 27000'],
            ['name' => 'Joint Commission for Healthcare Staffing'],
        ];

        foreach ($list as $item) {
            \App\Models\QualityCert::firstOrCreate($item);
        }
    }
}
