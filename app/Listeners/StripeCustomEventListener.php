<?php

namespace App\Listeners;

use App\Jobs\AssignProduct;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;
use Laravel\Cashier\Events\WebhookReceived;

class StripeCustomEventListener implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\Laravel\Cashier\Events\WebhookReceived  $event
     * @return void
     */
    public function handle(WebhookReceived $event) : void
    {
        if ($event->payload['type'] === 'invoice.payment_succeeded') {
            // Handle the incoming event...
           $subscription_id = $event->payload['data']['object']['subscription'];
           AssignProduct::dispatch($subscription_id);
        }
    
        // payment_intent.succeeded
        // customer.subscription.updated

        // customer.subscription.created
    }
}
