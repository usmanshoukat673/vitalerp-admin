<?php

namespace Database\Seeders;

use App\Models\SubjectType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubjectTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $subject_type = new SubjectType();

        $subject_type->create([
            'name' => 'Documents'
        ]);

        $subject_type->create([
            'name' => 'Traning'
        ]);

        $subject_type->create([
            'name' => 'Audits'
        ]);

        $subject_type->create([
            'name' => 'Assets'
        ]);

        $subject_type->create([
            'name' => 'Incidence'
        ]);

        $subject_type->create([
            'name' => 'Stakeholders'
        ]);

        $subject_type->create([
            'name' => 'Risk'
        ]);

        $subject_type->create([
            'name' => 'Assessments'
        ]);
    }
}
