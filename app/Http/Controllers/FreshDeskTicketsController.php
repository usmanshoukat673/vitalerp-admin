<?php

namespace App\Http\Controllers;

use App\Models\Freshdesk;
use App\Models\FreshdeskTicket;
use App\Models\User;
use App\Models\UserCompanies;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;

class FreshDeskTicketsController extends Controller
{
    public function createTicket(Request $request, FreshDeskController $freshDeskController)
    {
        $this->validate($request, [
            'subject' => 'required',
            'priority' => 'required',
            'type' => 'required',
            'description' => 'required',
            'tags' => 'required',
            'app_id' => 'required|exists:freshdesks,id',
            'comp_id' => 'required|exists:companies,id',
        ]);

        $app = Freshdesk::find($request->input('app_id'));

        $subject = $request->input('subject');
        $priority = $request->input('priority');
        $type = $request->input('type');
        $description = $request->input('description');
        $tags = $request->input('tags');
        $comp_id = $request->input('comp_id');
        $cc_admins = $request->input('cc_admins');
        $user = $request->user();

        $admins = [];

        if ($cc_admins === true) {
            $admins = $this->getAdmins($comp_id);
        }

        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request('POST', 'https://' . $app->domain_name . $app->api_url . $app->tickets, [
                'auth' => [$app->api_key, 'X'],
                'json' => [
                    'name' => $user->first_name . ' ' . $user->last_name,
                    'email' => $user->email,
                    'subject' => $subject,
                    'type' => $type,
                    'status' => 2,
                    'priority' => $priority,
                    'description' => $description,
                    'cc_emails' => $admins,
                    'source' => 2,
                    'tags' => $tags,

                ]
            ]);

            $freshDeskController->getTickets($app);

            $tickets = FreshdeskTicket::where(['comp_id' => $comp_id, 'config_id' => $app->id])->limit(10)->orderBy('created', 'desc')->get();

            return response()->json(['tickets' => $tickets], 200);

            // return $response->getStatusCode();
            // 403 = Forbidden
            // 401 = Unauthorised
            // 201
        } catch (ClientException $e) {
            $response = $e->getResponse();

            return $response;
        }
    }

    public function getAdmins($comp_id)
    {
        $users = UserCompanies::with('user')->where(['comp_id' => $comp_id, 'role' => 'A'])->get();

        $admins = [];

        if (count($users) > 0) {
            foreach ($users as $user) {
                array_push($admins, $user->user->email);
            }
        }

        return $admins;
    }
}
