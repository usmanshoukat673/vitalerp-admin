<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subject = new Subject();

        $subject->create([
            'project_id' => 6,
            'subject_type' => 1,
            'created_by' => 1,
            'comp_id' => 1
        ]);
    }
}
