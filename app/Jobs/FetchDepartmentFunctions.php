<?php

namespace App\Jobs;

use App\Http\Traits\AIBuild;
use App\Models\BuildFunctions;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FetchDepartmentFunctions implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, AIBuild;


    protected $build_id, $deparment_id, $standard_id, $prompt;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($build_id, $deparment_id, $standard_id, $prompt)
    {
        $this->build_id = $build_id;
        $this->deparment_id = $deparment_id;
        $this->standard_id = $standard_id;
        $this->prompt = $prompt;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $functions = $this->getFunctions($this->prompt);
        $this->storeFunction($functions);
    }

    private function storeFunction($functions)
    {
        if ($functions && count($functions) > 0) {
            foreach ($functions as $function) {
                if (!BuildFunctions::where(['build_id' => $this->build_id, 'name' => $function->name, 'standard_id' => $this->standard_id])->first()) {
                    BuildFunctions::create([
                        'build_id' => $this->build_id,
                        'name' => $function->name,
                        'standard_id' => $this->standard_id,
                        'deparment_id' => $this->deparment_id
                    ]);
                }
            }
        }
    }

    private function getFunctions($query)
    {
        return json_decode($this->execute_chat_gpt_prompt($query));
    }
}
