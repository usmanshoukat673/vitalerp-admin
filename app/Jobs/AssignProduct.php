<?php

namespace App\Jobs;

use App\Events\StandardSubscriptionProcessed;
use App\Exceptions\ProductNotFound;
use App\Exceptions\SubscriptionItemsNotFound;
use App\Http\Traits\StandardManager;
use App\Models\CompStandards;
use App\Models\MotionPlan;
use App\Models\Standard;
use App\Models\Subscription;
use App\Models\UserCompanies;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use InvalidArgumentException;


class AssignProduct implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, StandardManager;


    protected $subscription_id;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($subscription_id)
    {
        $this->subscription_id = $subscription_id;

        if ($subscription_id == null) {
            throw new InvalidArgumentException('$subscription_id argument cannot be null.');
        }
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $subscription = Subscription::with('items')->where(['stripe_id' => $this->subscription_id])->first();

        $addon_items = true;

        if ($subscription && count($subscription->items) > 0) {
            foreach ($subscription->items as $product) {

                $plan = MotionPlan::where(['stripe_price' => $product->stripe_price])->first();

                if ($plan->id == config('motion.business_plan')) {
                    $addon_items = false;
                    AssignBusinessPlan::dispatch($subscription->company_id);
                } else {
                    $standard = Standard::select('id')->where(['stripe_prod' => $product->stripe_product])->first();

                    if (!$standard) {
                        throw new ProductNotFound($product->stripe_product, $this->subscription_id);
                    }
                    if ($standard) {
                        $comp_id = $subscription->company_id;
                        $standard_id = $standard->id;

                        if (!CompStandards::where(['standard_id' => $standard_id, 'comp_id' => $comp_id])->first()) {
                            CompStandards::create(['standard_id' => $standard_id, 'comp_id' => $comp_id]);

                            $this->assignQuestions($comp_id, $standard_id);
                            $this->assignControls($comp_id, $standard_id);

                            $admin = UserCompanies::select('user_id')
                                ->where([
                                    'comp_id' => $comp_id,
                                    'role' => 'A'
                                ])
                                ->first();

                            if ($admin) {
                                $this->assignUserSection($admin->user_id, $comp_id, $standard_id);
                                $this->assignCustodianSection($admin->user_id, $comp_id, $standard_id);
                                $this->assignCompanySection($comp_id, $standard_id);
                            }
                        }
                    }
                }
            }

            if($addon_items)
            {
                StandardSubscriptionProcessed::dispatch($comp_id);
            }
            
        } else {
            throw new SubscriptionItemsNotFound("Subscription items are empty for SUB ID: " . $this->subscription_id);
        }
    }
}
