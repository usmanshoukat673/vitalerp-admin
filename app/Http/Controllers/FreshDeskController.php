<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Freshdesk;
use App\Models\FreshdeskAgent;
use App\Models\FreshdeskagentRole;
use App\Models\FreshdeskRoles;
use App\Models\FreshdeskTicket;
use Carbon\Carbon;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Http\Request;

class FreshDeskController extends Controller
{
    public function saveSettings(Request $request)
    {
        // TODO: needs to make sure wheter the active user has rights to save or configure application
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'api_key' => 'required',
            'integration_id' => 'required|exists:integrations,id',
            'domain_name' => 'required'
        ]);

        $comp_id = $request->input('comp_id');
        $app = Freshdesk::where(['comp_id' => $comp_id])->first();
        $integration_id = $request->input('integration_id');
        $change_domain = $request->input('change_domain');

        $application = Application::where(['comp_id' => $comp_id, 'integration_id' => $integration_id])->first();

        if ($app) {
            $app->api_key = $request->input('api_key');
            $app->domain_name = $request->input('domain_name');
            $app->configured = false;
            $app->save();

            if ($application) {
                $application->configured = false;
                $application->save();
            }
        } else {
            $app = Freshdesk::create([
                'comp_id' => $comp_id,
                'user_id' => $request->user()->id,
                'application_id' => $application->id,
                'api_key' => $request->input('api_key'),
                'domain_name' => $request->input('domain_name'),
                'api_url' => '.freshdesk.com',
                'agents' => '/api/v2/agents',
                'agent_profile' => '/api/v2/agents/',
                'roles' => '/api/v2/roles',
                'tickets' => '/api/v2/tickets',
            ]);
        }

        $status = $this->testConnection($app);

        if ($change_domain) {
            FreshdeskTicket::where(['comp_id' => $app->comp_id, 'config_id' => $app->id])->delete();
            FreshdeskRoles::where(['comp_id' => $app->comp_id, 'config_id' => $app->id])->delete();
            $agents = FreshdeskAgent::where(['comp_id' => $app->comp_id, 'config_id' => $app->id])->get();

            if (count($agents) > 0) {
                foreach ($agents as $agent) {
                    FreshdeskagentRole::where(['agent_id' => $agent->id])->delete();
                    $agent->delete();
                }
            }
        }

        if ($status == 200) {
            $app->connected = true;
            $app->save();
            return response()->json(['app' => $app], 200);
        } else if ($status == 401) {
            $app->connected = false;
            $app->save();
            return response()->json(['app' => $app], 401);
        } else if ($status == 404) {
            $app->connected = false;
            $app->save();
            return response()->json(['app' => $app], 404);
        } else if ($status == 403) {
            $app->connected = false;
            $app->save();
            return response()->json(['app' => $app], 403);
        }
    }

    public function testConnection($app)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', 'https://' . $app->domain_name . $app->api_url . $app->roles, [
                'auth' => [$app->api_key, 'X']
            ]);
            return $response->getStatusCode();
            // 403 = Forbidden
            // 401 = Unauthorised
        } catch (ClientException $e) {
            return $e->getResponse()->getStatusCode();
        }
    }

    public function reconnet(Request $request)
    {
        $this->validate($request, [
            'application_id' => 'required|exists:applications,id',
            'comp_id' => 'required|exists:companies,id',
        ]);

        $application_id = $request->input('application_id');
        $comp_id = $request->input('comp_id');

        $freshdesk = Freshdesk::where(['application_id' => $application_id, 'comp_id' => $comp_id])->first();

        $status = $this->testConnection($freshdesk);

        if ($status === 200) {
            $freshdesk->expired = false;
            $freshdesk->expired_at = null;
            $freshdesk->save();

            $freshdesk = Freshdesk::select('id', 'configured', 'connected', 'expired', 'expired_at')->find($freshdesk->id);

            if (request()->wantsJson()) {
                return response()->json(['freshdesk' => $freshdesk], 200);
            }
        } else {
            if (request()->wantsJson()) {
                return response()->json(['freshdesk' => $freshdesk], $status);
            }
        }
    }

    public function getSettings(Request $request)
    {
        // TODO: needs to make sure wheter the active user has rights to save or configure application
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id'
        ]);

        $app = Freshdesk::where(['comp_id' => $request->input('comp_id')])->first();

        if (request()->wantsJson()) {
            return response()->json(['app' => $app], 200);
        }

        return $app;
    }

    public function refresh(Request $request, AppFreshDeskController $appFreshDeskController)
    {
        $this->validate($request, [
            'application_id' => 'required|exists:applications,id',
            'comp_id' => 'required|exists:companies,id',
        ]);

        $application_id = $request->input('application_id');
        $comp_id = $request->input('comp_id');

        $app = Freshdesk::where(['application_id' => $application_id, 'comp_id' => $comp_id])->first();

        if ($app->last_refreshed !== null && now()->diffInMinutes($app->last_refreshed) < $app->refresh_interval) {
            return response()->json(['error_message' => $app->refresh_interval - now()->diffInMinutes($app->last_refreshed)], 429);
        }

        $this->getRoles($app);

        $this->getAgents($app);

        $this->getTickets($app);

        $app->last_refreshed = now()->toDateTimeString();
        $app->save();

        return $appFreshDeskController->agents($request);
    }

    public function finishSetup(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'integration_id' => 'required|exists:integrations,id',
        ]);

        $comp_id = $request->input('comp_id');
        $integration_id = $request->input('integration_id');

        $app = Freshdesk::where(['comp_id' => $comp_id])->first();

        $this->getRoles($app);

        $this->getAgents($app);

        $this->getTickets($app);

        $app->configured = true;
        $app->save();

        $application = Application::where(['comp_id' => $comp_id, 'integration_id' => $integration_id])->first();
        if ($application) {
            $application->configured = true;
            $application->save();
        }

        if (request()->wantsJson()) {
            return response()->json(['app' => $app], 200);
        }
    }

    public function getAgents($app)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                'https://' . $app->domain_name . $app->api_url . $app->agents,
                [
                    'auth' => [$app->api_key, 'X'],
                    'headers' => [
                        'Content-Type'     => 'application/json'
                    ]
                ]
            );

            if ($response->getStatusCode() === 200) {
                $agents = json_decode($response->getBody());

                if (count($agents) > 0) {
                    foreach ($agents as $agent) {
                        $this->getAgent($app, $agent);
                    }
                }
            }
        } catch (\Exception $ex) {
            throw $ex;
        }
    }

    public function getAgent($app, $agent)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                'https://' . $app->domain_name . $app->api_url . $app->agent_profile . $agent->id,
                [
                    'auth' => [$app->api_key, 'X'],
                    'headers' => [
                        'Content-Type'     => 'application/json'
                    ]
                ]
            );

            if ($response->getStatusCode() === 200) {
                $agent = json_decode($response->getBody());
                $this->insertAgent($app, $agent);
            }
        } catch (\Exception $ex) {
            throw $ex;
        }
    }

    public function insertAgent($app, $agent)
    {
        $existing_agent = FreshdeskAgent::where(['config_id' => $app->id, 'comp_id' => $app->comp_id, 'fd_agent_id' => $agent->id])->first();

        $last_login_at = ($agent->contact->last_login_at != null ? (Carbon::parse($agent->contact->last_login_at))->toDateTimeString() : null);

        $last_active_at = ($agent->last_active_at != null ? (Carbon::parse($agent->last_active_at))->toDateTimeString() : null);

        $created = (Carbon::parse($agent->contact->created_at))->toDateTimeString();

        $updated = (Carbon::parse($agent->contact->updated_at))->toDateTimeString();

        if (!$existing_agent) {
            $new_agent = FreshdeskAgent::create([
                'config_id' => $app->id,
                'comp_id' => $app->comp_id,
                'fd_agent_id' => $agent->id,
                'available' => $agent->available,
                'occasional' => $agent->occasional,
                'ticket_scope' => $agent->ticket_scope,
                'signature' => $agent->signature,
                'available_since' => $agent->available_since,
                'type' => $agent->type,
                'active' => $agent->contact->active,
                'email' => $agent->contact->email,
                'job_title' => $agent->contact->job_title,
                'language' => $agent->contact->language,
                'mobile' => $agent->contact->mobile,
                'name' => $agent->contact->name,
                'phone' => $agent->contact->phone,
                'time_zone' => $agent->contact->time_zone,
                'created' => $created,
                'updated' => $updated,
                'last_login_at' => $last_login_at,
                'last_active_at' => $last_active_at,
            ]);

            $this->insertAgentRoles($agent->role_ids, $new_agent->id);
        } else {
            $existing_agent->available = $agent->available;
            $existing_agent->occasional = $agent->occasional;
            $existing_agent->ticket_scope = $agent->ticket_scope;
            $existing_agent->signature = $agent->signature;
            $existing_agent->available_since = $agent->available_since;
            $existing_agent->type = $agent->type;
            $existing_agent->active = $agent->contact->active;
            $existing_agent->email = $agent->contact->email;
            $existing_agent->job_title = $agent->contact->job_title;
            $existing_agent->language = $agent->contact->language;
            $existing_agent->mobile = $agent->contact->mobile;
            $existing_agent->name = $agent->contact->name;
            $existing_agent->phone = $agent->contact->phone;
            $existing_agent->time_zone = $agent->contact->time_zone;
            $existing_agent->updated = $updated;
            $existing_agent->last_login_at = $last_login_at;
            $existing_agent->last_active_at = $last_active_at;
            $existing_agent->save();

            $this->insertAgentRoles($agent->role_ids, $existing_agent->id);
        }
    }

    public function insertAgentRoles($roles, $anget_id)
    {
        // needs to delete old roles - dicuss before proceding
        if (count($roles) > 0) {
            foreach ($roles as $role_id) {
                if (!FreshdeskagentRole::where(['agent_id' => $anget_id, 'role_id' => $role_id])->first()) {
                    FreshdeskagentRole::create(['agent_id' => $anget_id, 'role_id' => $role_id]);
                }
            }
        }
    }

    public function getRoles($app)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                'https://' . $app->domain_name . $app->api_url . $app->roles,
                [
                    'auth' => [$app->api_key, 'X'],
                    'headers' => [
                        'Content-Type'     => 'application/json'
                    ]
                ]
            );


            if ($response->getStatusCode() === 200) {
                $roles = json_decode($response->getBody());

                if (count($roles) > 0) {
                    foreach ($roles as $role) {
                        $this->insertRole($app, $role);
                    }
                }
            }
        } catch (\Exception $ex) {
            //throw $th;
        }
    }

    public function insertRole($app, $role)
    {
        $existing_role = FreshdeskRoles::where(['config_id' => $app->id, 'comp_id' => $app->comp_id, 'fd_role_id' => $role->id])->first();
        if (!$existing_role) {
            FreshdeskRoles::create([
                'fd_role_id' => $role->id,
                'config_id' => $app->id,
                'comp_id' => $app->comp_id,
                'name' => $role->name,
                'description' => $role->description,
                'default' => $role->default,
                'created' => (Carbon::parse($role->created_at))->toDateTimeString(),
                'updated' => (Carbon::parse($role->updated_at))->toDateTimeString()
            ]);
        } else {
            $existing_role->name = $role->name;
            $existing_role->description = $role->description;
            $existing_role->default = $role->default;
            $existing_role->updated = (Carbon::parse($role->updated_at))->toDateTimeString();
            $existing_role->save();
        }
    }

    public function getTickets($app)
    {
        try {
            $client = new \GuzzleHttp\Client();
            $response = $client->request(
                'GET',
                'https://' . $app->domain_name . $app->api_url . $app->tickets,
                [
                    'auth' => [$app->api_key, 'X'],
                    'headers' => [
                        'Content-Type'     => 'application/json'
                    ]
                ]
            );

            if ($response->getStatusCode() === 200) {
                $tickets = json_decode($response->getBody());

                if (count($tickets) > 0) {
                    foreach ($tickets as $ticket) {
                        $this->getTicket($app, $ticket);
                    }
                }
            }
        } catch (\Exception $ex) {
            //throw $th;
        }
    }

    public function getTicket($app, $ticket)
    {
        $this->insertTicket($app, $ticket);
    }

    public function insertTicket($app, $ticket)
    {
        $exiting_ticket = FreshdeskTicket::where(['config_id' => $app->id, 'comp_id' => $app->comp_id, 'fd_ticket_id' => $ticket->id])->first();

        if (!$exiting_ticket) {
            $new_ticket = FreshdeskTicket::create([
                'config_id' => $app->id,
                'comp_id' => $app->comp_id,
                'fd_ticket_id' => $ticket->id,
                'subject' => $ticket->subject,
                'priority' => $ticket->priority,
                'type' => $ticket->type,
                'tags' => json_encode($ticket->tags),
                'source' => $ticket->source,
                'data' => json_encode($ticket),
                'created' => (Carbon::parse($ticket->created_at))->toDateTimeString(),
                'updated' => (Carbon::parse($ticket->updated_at))->toDateTimeString()
            ]);
        } else {
            $exiting_ticket->subject = $ticket->subject;
            $exiting_ticket->priority = $ticket->priority;
            $exiting_ticket->type = $ticket->type;
            $exiting_ticket->tags = json_encode($ticket->tags);
            $exiting_ticket->source = $ticket->source;
            $exiting_ticket->data = json_encode($ticket);
            $exiting_ticket->updated = (Carbon::parse($ticket->updated_at))->toDateTimeString();
            $exiting_ticket->save();
        }
    }
}
