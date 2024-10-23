<?php

namespace App\Console\Commands;

use App\Models\SectionControl;
use Illuminate\Console\Command;
use OpenAI;

class ChatGPTAnaylysControl extends Command
{
    use CommandsTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chatgpt:sync-control {--standard_id=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get assessment questions for each control using ChatGPT';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

        $standard_id  = $this->option('standard_id');

        if ($standard_id > 0) {
            $client = OpenAI::client(config('motion.chatgpt_key'));

            $section_controls = SectionControl::select('id', 'description')->where(['standard_id' => $standard_id])->get();

            if(count($section_controls) > 0)
            {
                foreach($section_controls as $control)
                {
                    $questions = $this->getQuestions($client, $control->description);

                    if(count($questions) > 0)
                    {
                        foreach($questions as $question)
                        {
                            $this->addControlQuestion($control->id, $question);
                        }
                    }

                    sleep(5);
                }
                 
            }

            return Command::SUCCESS;
        } else {
            return Command::FAILURE;
        }
    }

    private function getQuestions($client, $query)
    {
        $result = $client->completions()->create([
            'model' => 'text-davinci-003',
            'prompt' => 'write an audit checklist as questions for ' . $query . '',
            'temperature' => 0.7,
            'max_tokens' => 256,
            'top_p' => 1,
            'frequency_penalty' => 0,
            'presence_penalty' => 0
        ]);

        $data = $result['choices'][0]['text'];

        $questions = array_filter(preg_split("/\n/", $data));

        if (count($questions) > 0) {
            foreach ($questions as $key => $number) {
                $number = preg_replace("/^[0-9]+\.\s/", "", $number);
                $questions[$key] = $number;
            }

            return $questions;
        } else {
            return [];
        }
    }
}
