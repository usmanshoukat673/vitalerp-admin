<?php

namespace Database\Seeders;

use App\Models\AssetQuestion;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedAssetQuestions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $MODULE_ID = 3;

        AssetQuestion::create([
            'name' => 'Where Did You Acquire It From?',
            'module_id' => $MODULE_ID
        ]);

        AssetQuestion::create([
            'name' => 'Who Is the Primary User or Department for This Asset?',
            'module_id' => $MODULE_ID
        ]);

        AssetQuestion::create([
            'name' => 'Who is the User/Department responsible for managing this Asset?',
            'module_id' => $MODULE_ID
        ]);

        AssetQuestion::create([
            'name' => 'What Is the Asset\'s Assigned Location?',
            'module_id' => $MODULE_ID
        ]);

        AssetQuestion::create([
            'name' => 'What Operating System or Software Is Pre-Installed?',
            'module_id' => $MODULE_ID
        ]);

        AssetQuestion::create([
            'name' => 'Is This Asset Part of a Larger Information System?',
            'module_id' => $MODULE_ID
        ]);
        
        AssetQuestion::create([
            'name' => 'What Data Types Will This Hardware Process or Store?',
            'module_id' => $MODULE_ID
        ]);
    }
}
