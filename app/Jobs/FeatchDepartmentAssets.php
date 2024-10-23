<?php

namespace App\Jobs;

use App\Http\Traits\AIBuild;
use App\Models\BuildAssetExample;
use App\Models\BuildAssets;
use App\Models\BuildFunctions;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FeatchDepartmentAssets implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, AIBuild;

    protected $build_id, $deparment_id, $standard_id, $prompt, $asset_type;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($build_id, $deparment_id, $standard_id, $prompt, $asset_type)
    {
        $this->build_id = $build_id;
        $this->deparment_id = $deparment_id;
        $this->standard_id = $standard_id;
        $this->prompt = $prompt;
        $this->asset_type = $asset_type;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        sleep(1);
        $assets = $this->getAssets($this->prompt);
        $this->storeAssets($assets);
        $this->function_exectued();
    }

    private function storeAssets($assets)
    {
        if ($assets && count($assets) > 0) {
            foreach ($assets as $asset) {
                if (!BuildAssets::where([
                    'build_id' => $this->build_id, 
                    'name' => $asset->name, 
                    'standard_id' => $this->standard_id, 
                    'type' => $this->asset_type])->first()) {

                    $build_asset = BuildAssets::create([
                        'build_id' => $this->build_id,
                        'name' => $asset->name,
                        'standard_id' => $this->standard_id,
                        'deparment_id' => $this->deparment_id,
                        'type' => $this->asset_type,
                        'included' => 1,
                        'responded' => 1
                    ]);
                    
                    $this->store_examples($asset->examples, $build_asset->id);
                }
            }
        }
    }

    private function store_examples($examples, $build_asset_id)
    {
        $examples = explode(",", $examples);

        if(count($examples) > 0)
        {
            foreach($examples as $example)
            {
                BuildAssetExample::create([
                    'name' => $example,
                    'build_asset_id' => $build_asset_id,
                    'standard_id' => $this->standard_id
                ]);
            }
        }
    }

    private function function_exectued()
    {
        BuildFunctions::where(['build_id' => $this->build_id, 'included' => 1, 'deparment_id' => $this->deparment_id, 'standard_id' => $this->standard_id, 'asset_executed' => 0])->update(['asset_executed' => 1]);
    }

    private function getAssets($query)
    {
        return json_decode($this->execute_chat_gpt_prompt($query));
    }
}
