<?php

namespace App\Http\Controllers;

use App\Models\UserCompanies;
use App\Models\Webhooks;
use Illuminate\Http\Request;

class WebhookManagmentController extends Controller
{
    public function list(Request $request)
    {
        $webhooks = Webhooks::get();

        return response()->json(['items' => $webhooks]);
    }

    public function comapnies(Request $request)
    {
        $user = $request->user();

        $companies = UserCompanies::with(['company' => function ($query) {
            $query->select('id', 'name');
        }])->where(['user_id' => $user->id])->get();

        return response()->json(['companies' => $companies]);
    }

    public function create(Request $request)
    {
        $this->validate($request, [
            'url' => 'required',
            'webhookId' => 'required',
            'compId' => 'required',
            'eventType' => 'required',
        ]);

        $url = $request->input('url');
        $webhookId = $request->input('webhookId');
        $compId = $request->input('compId');
        $eventType = $request->input('eventType');

        if (!Webhooks::where(['url' => $url, 'tag' => $webhookId, 'comp_id' => $compId, 'event_type' => $eventType])->first()) {
            $webhook = new Webhooks();
            $webhook->url = $url;
            $webhook->tag = $webhookId;
            $webhook->comp_id = $compId;
            $webhook->event_type = $eventType;
            $webhook->save();
        }

        return response()->json(['webhook' => $webhook]);
    }

    public function delete($webhookId)
    {
        if (!$webhookId) {
            abort(404);
        }

        if (Webhooks::where(['tag' => $webhookId])->first()) {
            Webhooks::where(['tag' => $webhookId])->delete();
        }

        return response()->json([]);
    }

    public function test(Request $request)
    {
        logger('The data from n8n');
        logger($request->all());
    }
}
