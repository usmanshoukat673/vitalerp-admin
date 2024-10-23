<?php

namespace App\Http\Traits;

use OpenAI;

trait AIBuild
{
    private function execute_chat_gpt_prompt($query)
    {
        $client = OpenAI::client(config('motion.chatgpt_key'));

        $result = $client->completions()->create([
            'model' => 'text-davinci-003',
            'prompt' => $query,
            'temperature' => 0.7,
            'max_tokens' => 256,
            'top_p' => 1,
            'frequency_penalty' => 0,
            'presence_penalty' => 0
        ]);

        return $result['choices'][0]['text'];
    }

    private function getCommaSeperatedItems($items, $field){
        $items = $items->map(function ($item) use ($field) {
            return $item->{$field};
        });
        $items = implode(', ', $items->all());

        return $items;
    }
}