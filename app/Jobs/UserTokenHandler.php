<?php

namespace App\Jobs;

use App\Models\Company;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use App\Models\OAuthAccessTokens;
use App\Models\OauthClients;
use App\Models\User;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;
use Laravel\Passport\TokenRepository;

class UserTokenHandler implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $clients;

    protected $tokenRepository;

    protected $user;
    protected $company;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user_id, $comp_id)
    {
        $this->user = User::find($user_id);
        $this->company = Company::find($comp_id);
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->clients = new ClientRepository;
        $this->tokenRepository = new TokenRepository;

        $oauth_client = OauthClients::where(['user_id' => $this->user->id])->first();

        if (!$oauth_client) {
            $name = $this->user->email . ' Personal Access Client';

            $redirect = config('motion.N8N_REDIRECT_URL');

            $confidential = true;

            $client = $this->clients->create(
                $this->user->id,
                $name,
                $redirect,
                'users',
                true,
                false,
                $confidential
            );

            if (Passport::$hashesClientSecrets) {
                return ['plainSecret' => $client->plainSecret] + $client->toArray();
            }

            $client->makeVisible('secret');

            $oauth_client = OauthClients::where(['user_id' => $this->user->id, 'personal_access_client' => true])->first();
        }


        $token = Passport::token()->where(['user_id' => $this->user->id, 'client_id' => $oauth_client->id, 'revoked' => false])->first();

        if (!$token) {
            $new_token = $this->user->createToken(
                $this->user->email . ' Access Token',
                [],
            );

            $this->user->global_api_key = $new_token->accessToken;
            $this->user->save();

            $token = OAuthAccessTokens::find($new_token->token->id);
            $token->client_id = $oauth_client->id;
            $token->save();
        }

        ReteTokenHandler::dispatch($this->user->id, $this->company->id);
    }
}
