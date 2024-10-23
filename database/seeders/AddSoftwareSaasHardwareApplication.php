<?php

namespace Database\Seeders;

use App\Models\MotionPrompt;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AddSoftwareSaasHardwareApplication extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $prompt = new MotionPrompt();

        $prompt->create([
            'name' => 'Get Software & SaaS Applications:',
            'prompt' => 'Create a list of all the software and SaaS applications for the [DEPARTMENT_NAME] functions [COMMA_LIST_FUNCTIONS];',
            'expected_response' => 'Response JSON fromatted array [{"name": }]',
            'variables' => '<code>[DEPARTMENT_NAME]</code> <code>[COMMA_LIST_FUNCTIONS]</code>'
        ]);

        $prompt->create([
            'name' => 'Get IT Hardwares:',
            'prompt' => 'Create a list of all the IT hardware for the [DEPARTMENT_NAME] functions [COMMA_LIST_FUNCTIONS];',
            'expected_response' => 'Response JSON fromatted array [{"name": }]',
            'variables' => '<code>[DEPARTMENT_NAME]</code> <code>[COMMA_LIST_FUNCTIONS]</code>'
        ]);

        // $prompt->create([
        //     'name' => 'Get vendors and suppliers:',
        //     'prompt' => 'Create a list of all the vendors and suppliers for the [DEPARTMENT_NAME] functions [COMMA_LIST_FUNCTIONS];',
        //     'expected_response' => 'Response JSON fromatted array [{"name": }]',
        //     'variables' => '<code>[DEPARTMENT_NAME]</code> <code>[COMMA_LIST_FUNCTIONS]</code>'
        // ]);
    }
}
