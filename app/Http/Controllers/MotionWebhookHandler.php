<?php

namespace App\Http\Controllers;

use App\Models\Webhooks;
use Illuminate\Http\Request;
use Spatie\WebhookServer\WebhookCall;

class MotionWebhookHandler extends Controller
{
    public function init(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required'
        ]);

        $user = $request->user();

        $comp_id = $request->input('comp_id');
        $webhooks = Webhooks::where(['comp_id' => $comp_id])->get();

        if(count($webhooks) > 0)
        {
            foreach ($webhooks as $webhook) {
                 WebhookCall::create()
            ->url($webhook->url)

            ->payload([
                'eventType' => 'control_status_change',
                'compId' => $comp_id,
                'catalogId' => '2222',
                'sectionId' => '4444',
                'controlId' => '5555'
            ])
            // ->doNotSign()
            ->useSecret('sign-using-this-secret')
            ->dispatch();
            }
        }


    }
}
