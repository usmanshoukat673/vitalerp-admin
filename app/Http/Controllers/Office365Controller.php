<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\MicrosoftGraph\Office365;
use Illuminate\Http\Request;
use League\OAuth2\Client\Provider\GenericProvider;
use Microsoft\Graph\Graph;

class Office365Controller extends Controller
{
    public function getSettings(Request $request)
    {
        // TODO: needs to make sure wheter the active user has rights to save or configure application
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id'
        ]);

        $app = Office365::where(['comp_id' => $request->input('comp_id')])->first();

        if (request()->wantsJson()) {
            return response()->json(['app' => $app], 200);
        }

        return $app;
    }

    public function authRequest(Request $request)
    {
        // TODO: needs to make sure wheter the active user has rights to save or configure application
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'integration_id' => 'required|exists:integrations,id'
        ]);

        $comp_id = $request->input('comp_id');
        $app = Office365::where(['comp_id' => $comp_id])->first();
        $integration_id = $request->input('integration_id');

        if ($app) {
            // $app->configured = false;
            // $app->save();

            $application = Application::where(['comp_id' => $comp_id, 'integration_id' => $integration_id])->first();
            if ($application) {
                // $application->configured = false;
                // $application->save();
            }
        } else {
            $app = Office365::create([
                'comp_id' => $comp_id,
                'user_id' => $request->user()->id,
                'domain_name' => 'https://graph.microsoft.com',
                'api' => '/v1.0'
            ]);
        }

        // create a request
        // Initialize the OAuth client
        $oauthClient = new GenericProvider([
            'clientId'                => config('motion.MS_OAUTH_APP_ID'),
            'clientSecret'            => config('motion.MS_OAUTH_APP_PASSWORD'),
            'redirectUri'             => config('motion.MS_OAUTH_REDIRECT_URI'),
            'urlAuthorize'            => config('motion.MS_OAUTH_AUTHORITY') . config('motion.MS_OAUTH_AUTHORIZE_ENDPOINT'),
            'urlAccessToken'          => config('motion.MS_OAUTH_AUTHORITY') . config('motion.MS_OAUTH_TOKEN_ENDPOINT'),
            'urlResourceOwnerDetails' => '',
            'scopes'                  => config('motion.MS_OAUTH_SCOPES')
        ]);

        $authUrl = $oauthClient->getAuthorizationUrl();
        $oauthState = $oauthClient->getState();

        $app->auth_url = $authUrl;
        $app->auth_state = $oauthState;
        $app->save();

        return response()->json(['app' => $app, 'oauthState' => $oauthState, 'authUrl' => $authUrl], 200);
    }

    public function getToken(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'integration_id' => 'required|exists:integrations,id',
            'state' => 'required',
            'code' => 'required'
        ]);

        $comp_id = $request->input('comp_id');
        $app = Office365::where(['comp_id' => $comp_id])->first();
        $integration_id = $request->input('integration_id');
        $providedState = $request->input('state');
        $authCode = $request->input('code');

        $expectedState = $app->auth_state;

        // if (!isset($expectedState)) {
        //     // If there is no expected state in the session,
        //     // do nothing and redirect to the home page.
        //     return redirect('/');
        // }

        // if (!isset($providedState) || $expectedState != $providedState) {
        //     return redirect('/')
        //         ->with('error', 'Invalid auth state')
        //         ->with('errorDetail', 'The provided auth state did not match the expected value');
        // }

        if (isset($authCode)) {
            // Initialize the OAuth client
            $oauthClient = new  GenericProvider([
                'clientId'                => config('motion.MS_OAUTH_APP_ID'),
                'clientSecret'            => config('motion.MS_OAUTH_APP_PASSWORD'),
                'redirectUri'             => config('motion.MS_OAUTH_REDIRECT_URI'),
                'urlAuthorize'            => config('motion.MS_OAUTH_AUTHORITY') . config('motion.MS_OAUTH_AUTHORIZE_ENDPOINT'),
                'urlAccessToken'          => config('motion.MS_OAUTH_AUTHORITY') . config('motion.MS_OAUTH_TOKEN_ENDPOINT'),
                'urlResourceOwnerDetails' => '',
                'scopes'                  => config('motion.MS_OAUTH_SCOPES')
            ]);

            try {
                // Make the token request
                $accessToken = $oauthClient->getAccessToken('authorization_code', [
                    'code' => $authCode
                ]);

                $app->auth_url = null;
                $app->auth_state = null;
                $app->access_token = $accessToken->getToken();
                $app->token_type = 'Bearer';
                $app->expires_in = $accessToken->getExpires();
                $app->connected = true;
                $app->save();

                // $application = Application::where(['comp_id' => $comp_id, 'integration_id' => $integration_id])->first();
                // $application->configured = false;
                // $application->save();

                return response()->json(['app' => $app], 200);

                // $graph = new Graph();
                // $graph->setAccessToken($accessToken->getToken());

                // $user = $graph->createRequest('GET', '/me?$select=displayName,mail,mailboxSettings,userPrincipalName')
                //     ->setReturnType(Model\User::class)
                //     ->execute();

                // // TEMPORARY FOR TESTING!
                // return redirect('/')
                //     ->with('error', 'Access token received')
                //     ->with('errorDetail', 'User:' . $user->getDisplayName() . ', Token:' . $accessToken->getToken());
            } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {
                return redirect('/')
                    ->with('error', 'Error requesting access token')
                    ->with('errorDetail', $e->getMessage());
            }
        }

        // return redirect('/')
        //     ->with('error', $request->query('error'))
        //     ->with('errorDetail', $request->query('error_description'));
    }
}
