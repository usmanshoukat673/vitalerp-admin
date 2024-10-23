<?php

namespace App\Console\Commands;

use App\Models\ReteToken;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use GuzzleHttp\Psr7;

class ReteHelper extends Command
{
    protected $app_url, $client_id, $client_secrete, $email, $password, $client;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'rete:test-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'This is helper command to test rete api';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->app_url  = config('services.rete.app_url');
        $this->client_id  = config('services.rete.client_id');
        $this->client_secrete  = config('services.rete.secret');
        $this->email  = config('services.rete.email');
        $this->password  = config('services.rete.password');
        $this->client = new Client(['base_uri' => $this->app_url]);
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $this->syncToken(1, 2, 'TEST ORG', 'KEY 1');
        // try {
        //     $request = $this->client->request('POST', '/api/v1/add-api-key', [
        //         'form_params' => [
        //             'user_id' => '',
        //             'key' => '',
        //             'comp_id' => '',
        //             'company_name' => '',
        //         ],
        //         'headers' => [
        //             'Authorization' => 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiYTBhZGQyZTU4M2FmZmI1MTRkYzliZTM1ZDhlMGI0YWZkYzE0MmI5MWExNTk2OTlhZTExYjY1MWI5ZjkzOWJmMTcxODRjMTVmNWZmZTQwZDMiLCJpYXQiOjE2NDcyNTU2MTguMzg0Nzk0LCJuYmYiOjE2NDcyNTU2MTguMzg0Nzk3LCJleHAiOjE2Nzg3OTE2MTguMzgxMjU0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.mXdGdMRRh-JIgfqHwcUtH6sBNZ9OHr0tW5TuR7uHeRXyHXWdeGMn7vjrTMBgOMcNEec3YfQMOwo8jubrMqEuNcyyiYcFbXtba9h0VirFr3nPK7nHNknkZZY8bVI2vQ2jPTzxzGNgS889CqPTQV97PPVlPIhCTzsYZAG2gHSVOlT_D77ucLSVzC8DyZDNmkJcnUiTLE0fRPfFVZZLm9eClSSti20LO2S86P4JLDYRpVtmlTL1wJf6qa_AOg5WdlvsUEXQR1_QkS4kSehGR2LAaDkeiQtmN1Env3MzpFvVtEV346Qg-UghvhBbbUZJWUcdaYIAWsmguwylmz4gFFTDXFtFLv7wTOQu8ktVnDvQfknM91bSPuzrszH2Fc-DVcGNUtI_YuqDLaeSGBpnueDKjgX3k6MrWHOBMDQjnCafMZTeN4kQnkPCYQyQuE64Iqrjm-xNQp_XR1zERonALYNKvkkR4AxnDbGZRW2q57aSOEbpdx-dS1dPYpPDr-1wcUlDsU1rgz-Xg-eGw3TTt52ehwka2m3nBB9_iPTTSFP62gM3-u2h4BoUitTvhGhYuX9dbqU3x1RQ0Lj0oGPIjOocerLP0NclZ82hmjguYCP6ure7goHTjdrQdpsQrfFfW3kcLIxgM91llVp5CNykoPh-3RTxw8AZfYNmXRlhwYDusTc',
        //             'Content-Type' => 'application/json',
        //             'Accept' => 'application/json'
        //         ],
        //         'http_errors'     => true,
        //         'timeout'         => 30,
        //         'connect_timeout' => true,
        //     ]);

        //     $response = $request ? $request->getBody()->getContents() : null;
        //     $status = $request ? $request->getStatusCode() : 500;

        //     dd($status);
        // } catch (ClientException $e) {

        //     if (($e->getResponse())->getStatusCode() === 401) {
        //         // regernerate token
        //         // dd($e->getMessage());
        //         dd('token expired');
        //     }

        //     // echo Psr7\Message::toString($e->getRequest());
        //     // echo Psr7\Message::toString(($e->getResponse())->getStatusCode());
        // }

        return 0;
    }

    public function syncToken($user_id, $comp_id, $company_name, $key)
    {
        $token = ReteToken::first();

        if (!$token) {
            $token = $this->generateToken();
        }

        try {
            $request = $this->client->request('POST', '/api/v1/add-api-key', [
                'form_params' => [
                    'user_id' => $user_id,
                    'key' => $key,
                    'comp_id' => $comp_id,
                    'company_name' => $company_name,
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
                return true;
            }
        } catch (ClientException $e) {

            if (($e->getResponse())->getStatusCode() === 401) {
                $this->refreshToken($token->refresh_token, $token->id);
                $this->syncToken($user_id, $comp_id, $company_name, $key);
            } elseif (($e->getResponse())->getStatusCode() === 422) {
                dd($e->getMessage());
            }
        }
    }

    // help // https://laracasts.com/discuss/channels/code-review/what-is-the-best-way-to-consume-a-rest-api-in-laravel-58
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
