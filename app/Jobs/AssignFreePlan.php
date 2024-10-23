<?php

namespace App\Jobs;

use App\Events\FreePlanAssigned;
use App\Http\Traits\StandardManager;
use App\Models\CompStandards;
use App\Models\Plan;
use App\Models\UserCompanies;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use InvalidArgumentException;

class AssignFreePlan implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, StandardManager;

    protected $comp_id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($comp_id)
    {
        $this->comp_id = $comp_id;

        if ($comp_id == null) {
            throw new InvalidArgumentException('$comp_id argument cannot be null.');
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $plan = Plan::with(['features' => function ($query) {
            $query->select('id', 'plan_id', 'feature_id', 'type')->where(['type' => 'standard']);
        }])
        ->find(1);

        if(count($plan->features) > 0)
        {
            foreach($plan->features as $feture)
            {
                if (!CompStandards::where(['standard_id' => $feture->feature_id, 'comp_id' => $this->comp_id])->first()) {
                    CompStandards::create(['standard_id' => $feture->feature_id, 'comp_id' => $this->comp_id]);
    
                    $this->assignQuestions($this->comp_id, $feture->feature_id);
                    $this->assignControls($this->comp_id, $feture->feature_id);
    
                    $admin = UserCompanies::select('user_id')
                        ->where([
                            'comp_id' => $this->comp_id,
                            'role' => 'A'
                        ])
                        ->first();
    
                    if ($admin) {
                        $this->assignUserSection($admin->user_id, $this->comp_id, $feture->feature_id);
                        $this->assignCustodianSection($admin->user_id, $this->comp_id, $feture->feature_id);
                        $this->assignCompanySection($this->comp_id, $feture->feature_id);
                    }
                }
            }
        }

        FreePlanAssigned::dispatch($this->comp_id);
    }
}
