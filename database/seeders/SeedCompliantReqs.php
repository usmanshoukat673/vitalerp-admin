<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedCompliantReqs extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list = [
            ['name' => 'DFAR Compliant to NIST 800-171 Cyber Security'],
            ['name' => 'Cybersecurity Maturity Model Certification (CMMC) - Level 1'],
        ];

        foreach ($list as $item) {
            \App\Models\CompliantReq::firstOrCreate($item);
        }
    }
}
