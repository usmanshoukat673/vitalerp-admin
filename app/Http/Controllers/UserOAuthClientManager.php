<?php

namespace App\Http\Controllers;

use App\Models\OAuthAccessTokens;
use App\Models\OauthClients;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Laravel\Passport\ClientRepository;
use Laravel\Passport\Passport;
use Laravel\Passport\TokenRepository;
use Illuminate\Support\Facades\Route;

class UserOAuthClientManager extends Controller
{
    // use AuthenticatesUsers;
    /**
     * The client repository instance.
     *
     * @var \Laravel\Passport\ClientRepository
     */
    protected $clients;

    /**
     * The token repository implementation.
     *
     * @var \Laravel\Passport\TokenRepository
     */
    protected $tokenRepository;


    /**
     * Create a client controller instance.
     *
     * @param  \Laravel\Passport\ClientRepository  $clients
     * @param  \Illuminate\Contracts\Validation\Factory  $validation
     * @param  \Laravel\Passport\Http\Rules\RedirectRule  $redirectRule
     * @return void
     */
    public function __construct(
        ClientRepository $clients,
        // ValidationFactory $validation,
        // RedirectRule $redirectRule
        TokenRepository $tokenRepository
    ) {
        $this->clients = $clients;
        // $this->validation = $validation;
        // $this->redirectRule = $redirectRule;
        $this->tokenRepository = $tokenRepository;
    }

    public function create(Request $request)
    {
        $user = $request->user();

        $oauth_client = OauthClients::where(['user_id' => $user->id])->first();

        if (!$oauth_client) {
            $name = $user->first_name . ' Personal Access Client';

            $redirect = config('motion.N8N_REDIRECT_URL');

            $confidential = true;

            $client = $this->clients->create(
                $user->id,
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

            $oauth_client = OauthClients::where(['user_id' => $user->id, 'personal_access_client' => true])->first();
        }


        $token = Passport::token()->where(['user_id' => $user->id, 'client_id' => $oauth_client->id, 'revoked' => false])->first();

        if (!$token) {

            $new_token = $request->user()->createToken(
                $request->name,
                $request->scopes ?: [],
            );

            $user->global_api_key = $new_token->accessToken;
            $user->save();

            $token = OAuthAccessTokens::find($new_token->token->id);
            $token->client_id = $oauth_client->id;
            $token->save();

            return response(['accessToken' => $new_token->accessToken]);
        }

        return response(['accessToken' => $user->global_api_key]);
    }
}
