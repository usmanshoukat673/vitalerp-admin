<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedModules extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Module::create(['name' => 'Services', 'type' => 'lanscapes']);
        Module::create(['name' => 'Products', 'type' => 'lanscapes']);
        Module::create(['name' => 'Hardware', 'type' => 'lanscapes']);
        Module::create(['name' => 'Software', 'type' => 'lanscapes']);
        Module::create(['name' => 'Cloud services', 'type' => 'lanscapes']);
        Module::create(['name' => 'Data sets', 'type' => 'lanscapes']);
        Module::create(['name' => 'Processes', 'type' => 'lanscapes']);
        Module::create(['name' => 'Information systems', 'type' => 'lanscapes']);
        Module::create(['name' => 'Vendors', 'type' => 'third-party']);
        Module::create(['name' => 'Suppliers', 'type' => 'third-party']);
        Module::create(['name' => 'Risks', 'type' => 'threat-trends']);
        Module::create(['name' => 'POAM', 'type' => 'threat-trends']);
        Module::create(['name' => 'Corrective Actions', 'type' => 'threat-trends']);
        Module::create(['name' => 'Process Improvements', 'type' => 'threat-trends']);
        Module::create(['name' => 'Legal Requirements', 'type' => 'organization']);
        Module::create(['name' => 'Regulatory Requirements', 'type' => 'organization']);
        Module::create(['name' => 'Contractual Requirements', 'type' => 'organization']);
        Module::create(['name' => 'Certifications', 'type' => 'organization']);
        Module::create(['name' => 'Scopes', 'type' => 'organization']);
        Module::create(['name' => 'Incidents', 'type' => 'threat-trends']);
        Module::create(['name' => 'Agents', 'type' => 'agents']);
    }
}
