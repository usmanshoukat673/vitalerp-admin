<?php

namespace Database\Seeders;

use App\Models\State;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $state = new State();

        $state->create([
            'name' => 'Draft'
        ]);

        $state->create([
            'name' => 'Saved'
        ]);

        $state->create([
            'name' => 'Assigned'
        ]);

        $state->create([
            'name' => 'Review'
        ]);

        $state->create([
            'name' => 'Active'
        ]);

        $state->create([
            'name' => 'Inactive'
        ]);
    }
}
