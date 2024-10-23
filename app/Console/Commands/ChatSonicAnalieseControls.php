<?php

namespace App\Console\Commands;

use App\Models\SectionControl;
use GuzzleHttp\Client;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class ChatSonicAnalieseControls extends Command
{
    use CommandsTrait;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'chatsonic:sync-control {--standard_id=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Get assessment questions for each control using chatsonic';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $standard_id  = $this->option('standard_id');

        if ($standard_id > 0) {

            $client = new Client();

            $section_controls = SectionControl::select('id', 'description')->where(['standard_id' => $standard_id])->get();

            if (count($section_controls) > 0) {
                foreach ($section_controls as $control) {
                    $questions = $this->getQuestions($client, $control->description);

                    if (count($questions) > 0) {
                        foreach ($questions as $question) {
                            $this->addControlQuestion($control->id, $question, 'chatsonic');
                        }
                    }

                    sleep(5);
                }
            }

            return Command::SUCCESS;
        }

        return Command::FAILURE;
    }

    private function getQuestions($client, $query)
    {
        $response = $client->request('POST', 'https://api.writesonic.com/v2/business/content/chatsonic?engine=premium', [
            'body' => '{"enable_google_results":"true","enable_memory":false,"input_text":"write an audit checklist as questions for: ' . $query . ' "}',
            'headers' => [
                'X-API-KEY' => config('motion.chatsonic_key'),
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ],
        ]);

        $response = json_decode($response->getBody(), true);

        $data = $response['message'];

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
