<?php

namespace App\Jobs;

use App\Models\Company;
use App\Models\Freshservice\Freshservice;
use App\Models\Freshservice\FreshserviceAgents;
use App\Models\Freshservice\FreshservicegentRoles;
use App\Models\Freshservice\FreshserviceRoles;
use App\Models\Freshservice\FreshserviceTickets;
use App\Models\User;
use Carbon\Carbon;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class FreshserviceLookup implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $freshservice;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($freshservice)
    {
        $this->freshservice = $freshservice;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $status = $this->testConnection($this->freshservice);

        if ($status === 200) {
            $this->getRoles($this->freshservice);
            $this->getAgents($this->freshservice);
            $this->getTickets($this->freshservice);
            $this->freshservice->last_refreshed = now()->toDateTimeString();
            $this->freshservice->save();
        } else {
            $this->freshservice->expired = true;
            $this->freshservice->expired_at = now()->toDateTimeString();
            $this->freshservice->save();

            $user = User::find($this->freshservice->user_id);
            $company = Company::find($this->freshservice->comp_id);

            $data['first_name'] = $user->first_name;
            $data['company_name'] = $company->name;
            $data['failed_at'] = $this->freshservice->expired_at . '(UTC)';

            $user->sendFSFailedNotification($data);

            // send notification to the admin of the freshdesk
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
