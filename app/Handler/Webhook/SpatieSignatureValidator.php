<?php

namespace App\Handler\Webhook;

use Spatie\WebhookClient\SignatureValidator\SignatureValidator;
use Spatie\WebhookClient\WebhookConfig;
use Illuminate\Http\Request;

class SpatieSignatureValidator implements SignatureValidator
{
    public function isValid(Request $request, WebhookConfig $config): bool
    {
        logger($config->signingSecret);
        logger($config->signatureHeaderName);
        return true;
    }
}
