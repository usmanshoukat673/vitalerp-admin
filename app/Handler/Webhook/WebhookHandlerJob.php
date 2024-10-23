<?php

namespace App\Handler\Webhook;

use Spatie\WebhookClient\Jobs\ProcessWebhookJob;

class WebhookHandlerJob  extends ProcessWebhookJob
{

    public function handle()
    {
        logger('I am in WebhookHandlerJob');
        logger($this->webhookCall);
    }
}
