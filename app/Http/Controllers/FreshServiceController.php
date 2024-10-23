<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Freshservice\Freshservice;
use App\Models\Freshservice\FreshserviceAgents;
use App\Models\Freshservice\FreshservicegentRoles;
use App\Models\Freshservice\FreshserviceRoles;
use App\Models\Freshservice\FreshserviceTickets;
use Carbon\Carbon;
use Illuminate\Http\Request;
use GuzzleHttp\Exception\ClientException;

class FreshServiceController extends Controller
{
    public function reconnet(Request $request)
    {
        $this->validate($request, [
            'application_id' => 'required|exists:applications,id',
            'comp_id' => 'required|exists:companies,id',
        ]);

        $application_id = $request->input('application_id');
        $comp_id = $request->input('comp_id');

        $freshservice = Freshservice::where(['application_id' => $application_id, 'comp_id' => $comp_id])->first();

        $status = $this->testConnection($freshservice);

        if ($status === 200) {
            $freshservice->expired = false;
            $freshservice->expired_at = null;
            $freshservice->save();

            $freshservice = Freshservice::select('id', 'configured', 'connected', 'expired', 'expired_at')->find($freshservice->id);

            if (request()->wantsJson()) {
                return response()->json(['freshservice' => $freshservice], 200);
            }
        } else {
            if (request()->wantsJson()) {
                return response()->json(['freshservice' => $freshservice], $status);
            }
        }
    }

    public function getSettings(Request $request)
    {
        // TODO: needs to make sure wheter the active user has rights to save or configure application
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id'
        ]);

        $app = Freshservice::where(['comp_id' => $request->input('comp_id')])->first();

        if (request()->wantsJson()) {
            return response()->json(['app' => $app], 200);
        }

        return $app;
    }

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
        $app = Freshservice::where(['comp_id' => $comp_id])->first();
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
            $app = Freshservice::create([
                'comp_id' => $comp_id,
                'user_id' => $request->user()->id,
                'application_id' => $application->id,
                'api_key' => $request->input('api_key'),
                'domain_name' => $request->input('domain_name'),
                'api_url' => '.freshservice.com',
                'agents' => '/api/v2/agents',
                'agent_profile' => '/api/v2/agents/',
                'roles' => '/api/v2/roles',
                'tickets' => '/api/v2/tickets',
            ]);
        }

        $status = $this->testConnection($app);

        if ($change_domain) {
            FreshserviceTickets::where(['comp_id' => $app->comp_id, 'config_id' => $app->id])->delete();
            FreshserviceRoles::where(['comp_id' => $app->comp_id, 'config_id' => $app->id])->delete();
            $agents = FreshserviceAgents::where(['comp_id' => $app->comp_id, 'config_id' => $app->id])->get();

            if (count($agents) > 0) {
                foreach ($agents as $agent) {
                    FreshservicegentRoles::where(['agent_id' => $agent->id])->delete();
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

    public function refresh(Request $request, AppFreshServiceController $appFreshServiceController)
    {
        $this->validate($request, [
            'application_id' => 'required|exists:applications,id',
            'comp_id' => 'required|exists:companies,id',
        ]);

        $application_id = $request->input('application_id');
        $comp_id = $request->input('comp_id');

        $app = Freshservice::where(['application_id' => $application_id, 'comp_id' => $comp_id])->first();

        if ($app->last_refreshed !== null && now()->diffInMinutes($app->last_refreshed) < $app->refresh_interval) {
            return response()->json(['error_message' => $app->refresh_interval - now()->diffInMinutes($app->last_refreshed)], 429);
        }

        $this->getRoles($app);

        $this->getAgents($app);

        $this->getTickets($app);

        $app->last_refreshed = now()->toDateTimeString();
        $app->save();

        return $appFreshServiceController->agents($request);
    }

    public function finishSetup(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'integration_id' => 'required|exists:integrations,id',
        ]);

        $comp_id = $request->input('comp_id');
        $integration_id = $request->input('integration_id');

        $app = Freshservice::where(['comp_id' => $comp_id])->first();

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

                $data = json_decode($response->getBody());

                if ($data->agents && count($data->agents) > 0) {
                    foreach ($data->agents as $agent) {
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
                $data = json_decode($response->getBody());
                $this->insertAgent($app, $data->agent);
            }
        } catch (\Exception $ex) {
            throw $ex;
        }
    }

    public function insertAgent($app, $agent)
    {
        $existing_agent = FreshserviceAgents::where(['config_id' => $app->id, 'comp_id' => $app->comp_id, 'fs_agent_id' => $agent->id])->first();

        $last_login_at = ($agent->last_login_at != null ? (Carbon::parse($agent->last_login_at))->toDateTimeString() : null);

        $last_active_at = ($agent->last_active_at != null ? (Carbon::parse($agent->last_active_at))->toDateTimeString() : null);

        $created = (Carbon::parse($agent->created_at))->toDateTimeString();

        $updated = (Carbon::parse($agent->updated_at))->toDateTimeString();

        if (!$existing_agent) {
            $new_agent = FreshserviceAgents::create([
                'config_id' => $app->id,
                'comp_id' => $app->comp_id,
                'fs_agent_id' => $agent->id,
                'occasional' => $agent->occasional,
                'scopes' => json_encode($agent->scopes),
                'signature' => $agent->signature,
                'active' => $agent->active,
                'email' => $agent->email,
                'job_title' => $agent->job_title,
                'language' => $agent->language,
                'work_phone_number' => $agent->work_phone_number,
                'mobile_phone_number' => $agent->mobile_phone_number,
                'first_name' => $agent->first_name,
                'last_name' => $agent->last_name,
                'time_zone' => $agent->time_zone,
                'created' => $created,
                'updated' => $updated,
                'last_login_at' => $last_login_at,
                'last_active_at' => $last_active_at,
            ]);

            $this->insertAgentRoles($agent->role_ids, $new_agent->id);
        } else {
            $existing_agent->occasional = $agent->occasional;
            $existing_agent->scopes = json_encode($agent->scopes);
            $existing_agent->signature = $agent->signature;
            $existing_agent->active = $agent->active;
            $existing_agent->email = $agent->email;
            $existing_agent->job_title = $agent->job_title;
            $existing_agent->language = $agent->language;
            $existing_agent->first_name = $agent->first_name;
            $existing_agent->last_name = $agent->last_name;
            $existing_agent->work_phone_number = $agent->work_phone_number;
            $existing_agent->mobile_phone_number = $agent->mobile_phone_number;
            $existing_agent->time_zone = $agent->time_zone;
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
                if (!FreshservicegentRoles::where(['agent_id' => $anget_id, 'role_id' => $role_id])->first()) {
                    FreshservicegentRoles::create(['agent_id' => $anget_id, 'role_id' => $role_id]);
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
                $data = json_decode($response->getBody());

                if (count($data->roles) > 0) {
                    foreach ($data->roles as $role) {
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
        $existing_role = FreshserviceRoles::where(['config_id' => $app->id, 'comp_id' => $app->comp_id, 'fs_role_id' => $role->id])->first();
        if (!$existing_role) {
            FreshserviceRoles::create([
                'fs_role_id' => $role->id,
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
                $data = json_decode($response->getBody());

                if (count($data->tickets) > 0) {
                    foreach ($data->tickets as $ticket) {
                        $this->getTicket($app, $ticket);
                    }
                }
            }
        } catch (\Exception $ex) {
            throw $ex;
        }
    }

    public function getTicket($app, $ticket)
    {
        $this->insertTicket($app, $ticket);
    }

    public function insertTicket($app, $ticket)
    {
        $exiting_ticket = FreshserviceTickets::where(['config_id' => $app->id, 'comp_id' => $app->comp_id, 'fs_ticket_id' => $ticket->id])->first();

        if (!$exiting_ticket) {
            $new_ticket = FreshserviceTickets::create([
                'config_id' => $app->id,
                'comp_id' => $app->comp_id,
                'fs_ticket_id' => $ticket->id,
                'subject' => $ticket->subject,
                'priority' => $ticket->priority,
                'type' => $ticket->type,
                'source' => $ticket->source,
                'data' => json_encode($ticket),
                'created' => (Carbon::parse($ticket->created_at))->toDateTimeString(),
                'updated' => (Carbon::parse($ticket->updated_at))->toDateTimeString()
            ]);
        } else {
            $exiting_ticket->subject = $ticket->subject;
            $exiting_ticket->priority = $ticket->priority;
            $exiting_ticket->type = $ticket->type;
            $exiting_ticket->source = $ticket->source;
            $exiting_ticket->data = json_encode($ticket);
            $exiting_ticket->updated = (Carbon::parse($ticket->updated_at))->toDateTimeString();
            $exiting_ticket->save();
        }
    }
}
