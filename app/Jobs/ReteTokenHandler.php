<?php

namespace App\Jobs;

use App\Models\Company;
use App\Models\ReteToken;
use App\Models\User;
use App\Models\UserCompanies;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7;

class ReteTokenHandler implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $app_url, $client_id, $client_secrete, $email, $password, $client;

    protected $user_id, $comp_id, $company_name, $token, $user, $company;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_id, $comp_id)
    {
        $this->app_url  = config('services.rete.app_url');
        $this->client_id  = config('services.rete.client_id');
        $this->client_secrete  = config('services.rete.secret');
        $this->email  = config('services.rete.email');
        $this->password  = config('services.rete.password');
        $this->user_id = $user_id;
        $this->comp_id = $comp_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->client = new Client(['base_uri' => $this->app_url]);

        $this->user = User::find($this->user_id);
        $this->company = Company::find($this->comp_id);
        $this->company_name = $this->company->name . ' Motion Account';

        // $encryption_key = config('services.rete.encryption_key');
        // $encryptor_app = config('services.rete.encryptor_app');

        // $the_access_token = shell_exec('cd ' . $encryptor_app . ' && ENC_KEY="' . $encryption_key . '" node encrypt.js "accessToken" "' . $this->user->global_api_key . '"');
        $this->token = $this->user->global_api_key;

        $this->syncToken();
    }

    public function syncToken()
    {
        $token = ReteToken::first();

        if (!$token) {
            $token = $this->generateToken();
        }

        try {
            $request = $this->client->request('POST', '/api/v1/add-api-key', [
                'form_params' => [
                    'user_id' => $this->user_id,
                    'token' => $this->token,
                    'comp_id' => $this->comp_id,
                    'company_name' => $this->company_name,
                ],
                'headers' => [
                    'Authorization' => 'Bearer ' . $token->access_token,
                ],
                'http_errors'     => true,
                'timeout'         => 30,
                'connect_timeout' => true,
            ]);

            $response = $request ? $request->getBody()->getContents() : null;
            $status = $request ? $request->getStatusCode() : 500;

            if ($status == 200) {
                UserCompanies::where(['user_id' => $this->user_id, 'comp_id' => $this->comp_id])
                    ->update(['rete_sync' => true]);
            }
        } catch (ClientException $e) {

            if (($e->getResponse())->getStatusCode() === 401) {
                $this->refreshToken($token->refresh_token, $token->id);
                $this->syncToken();
            } elseif (($e->getResponse())->getStatusCode() === 422) {
                logger('Rete Communication Error Message: [' . now()->toDateTimeString() . '] :-' . $e->getMessage());
            }
        }
    }

    public function generateToken()
    {
        $request = $this->client->request('POST', '/oauth/token', [
            'form_params' => [
                'grant_type' => 'password',
                'client_id' => $this->client_id,
                'client_secret' => $this->client_secrete,
                'username' => $this->email,
                'password' => $this->password,
                'scope' => "*",
            ]
        ]);


        $response = $request ? $request->getBody()->getContents() : null;
        $status = $request ? $request->getStatusCode() : 500;

        if ($response && $status === 200 && $response !== 'null') {
            $token = json_decode($response);
            return ReteToken::create([
                'token_type' => $token->token_type,
                'access_token' => $token->access_token,
                'refresh_token' => $token->refresh_token,
                'expires_in' => $token->expires_in,
            ]);
        }
    }

    public function refreshToken($refresh_token, $id)
    {
        $request = $this->client->request('POST', '/oauth/token', [
            'form_params' => [
                'grant_type' => 'refresh_token',
                'client_id' => $this->client_id,
                'client_secret' => $this->client_secrete,
                'username' => $this->email,
                'refresh_token' => $refresh_token,
                'scope' => "*",
            ]
        ]);


        $response = $request ? $request->getBody()->getContents() : null;
        $status = $request ? $request->getStatusCode() : 500;

        if ($response && $status === 200 && $response !== 'null') {
            $token = json_decode($response);
            return ReteToken::where(['id' => $id])->update([
                'token_type' => $token->token_type,
                'access_token' => $token->access_token,
                'refresh_token' => $token->refresh_token,
                'expires_in' => $token->expires_in,
            ]);
        }
    }
}
