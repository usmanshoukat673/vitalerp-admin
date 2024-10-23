<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\WebhookServer\WebhookCall;

class SendWebhookController extends Controller
{
    public function send()
    {

        WebhookCall::create()
            ->url('https://7gxtnuf6playj89qfennvipr.hooks.n8n.cloud/webhook-test/ba0c3b4f-3216-4542-94bc-4126ecf4a5f8/webhook')
            // ->url('http://motion.test/webhooks')
            ->payload([
                'eventType' => 'control_status_change',
                'compId' => '1111',
                'catalogId' => '2222',
                'sectionId' => '4444',
                'controlId' => '5555'
            ])
            // ->doNotSign()
            ->useSecret('sign-using-this-secret')
            ->dispatch();

        // $url = 'https://7gxtnuf6playj89qfennvipr.hooks.n8n.cloud/webhook-test/ba0c3b4f-3216-4542-94bc-4126ecf4a5f8/webhook';
        // $data = [
        //     'status_code' => 200,
        //     'status' => 'success',
        //     'message' => 'webhook send successfully',
        //     'extra_data' => [
        //         'first_name' => 'yogesh',
        //         'last_name' => 'koli',
        //         'form_response' => 'testing',
        //     ],
        // ];
        // $json_array = json_encode($data);
        // $curl = curl_init();
        // $headers = ['Content-Type: application/json'];

        // curl_setopt($curl, CURLOPT_URL, $url);
        // curl_setopt($curl, CURLOPT_POST, 1);
        // curl_setopt($curl, CURLOPT_POSTFIELDS, $json_array);
        // curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        // curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        // curl_setopt($curl, CURLOPT_HEADER, 1);
        // curl_setopt($curl, CURLOPT_TIMEOUT, 30);

        // $response = curl_exec($curl);
        // $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        // curl_close($curl);

        // if ($http_code >= 200 && $http_code < 300) {
        //     echo "webhook send successfully.";
        // } else {
        //     echo "webhook failed.";
        // }
    }
}
