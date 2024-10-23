<?php 

namespace App\Console\Commands;

use App\Models\ControlQuestion;
use App\Models\ControlQuestionMap;

trait CommandsTrait{
    private function addControlQuestion($control_id, $question_name, $source = 'chatgpt'){
        $question = ControlQuestion::create(['name' => $question_name, 'source' => $source]);

        ControlQuestionMap::create([
            'control_id' => $control_id,
            'question_id' => $question->id
        ]);

        return true;
    }
}