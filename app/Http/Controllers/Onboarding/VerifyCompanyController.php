<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Traits\AccountCreation;
use App\Http\Traits\States;
use App\Models\BuildRequest;
use App\Models\Company;
use App\Models\MotionPrompt;
use App\Models\PanelUserActivities;
use App\Models\User;
use GuzzleHttp\Client;
use Illuminate\Auth\Events\Registered;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class VerifyCompanyController extends Controller
{
    use AccountCreation, States;

    public function orerview($build_id)
    {
        if ($build_id == null || !$build_id) {
            abort(404);
        }

        try {
            return BuildRequest::where(['active' => 1, 'id' => decrypt($build_id)])->first();
        } catch (DecryptException $e) {
            return response()->json("Invalid Request.", 422);
        }
    }

    public function usStates()
    {
        return $this->us_states();
    }

    public function verify(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'company_name' => 'required',
            'city' => 'required',
            'state' => 'required',
            'street_address' => 'required'
        ]);

        try {
            $buildRequest = BuildRequest::where(['active' => 1, 'id' => decrypt($request->input('build_id'))])->first();
            $company_name = $request->input('company_name');
            $city = $request->input('city');
            $state = $request->input('state');
            $street_address = $request->input('street_address');

            if (!$buildRequest) {
                return $this->invaliData();
            }

            $user = new User();
            $company = new Company();

            if (!$this->checkIfAccountExists($buildRequest->email)) {
                $password =  Str::random(8);

                $user = User::create([
                    'first_name' => '[Not Set]',
                    'last_name' => '[Not Set]',
                    'email' => $buildRequest->email,
                    'password' => Hash::make($password),
                ]);

                $company = $this->createCompany($company_name, $user, $city, $state);

                event(new Registered($user));
            } else {
                $user = User::where(['email' => $buildRequest->email])->first();

                if ($user->only_panel === 1) {
                    $user->only_panel = 0;
                    $user->save();
                    // save activity 
                    PanelUserActivities::create(['user_id' => $user->id, 'description' => 'Converted from Policy Panel user to active user']);
                }
            }

            if (
                $buildRequest->company_name != $company_name ||
                $buildRequest->city != $city ||
                $buildRequest->state != $state ||
                $buildRequest->street_address != $street_address
            ) {
                $prompt = $this->getPrompt(config('motion.prompt_comp_description'), $company_name, $street_address, $city, $state);

                $overview = $this->callChatSonic($prompt);

                $buildRequest->overview = $overview;
                $buildRequest->company_name = $company_name;
                $buildRequest->city = $city;
                $buildRequest->state = $state;
                $buildRequest->street_address = $street_address;
                $buildRequest->used_at = now()->toDateTimeString();
                $buildRequest->user_id = $user->id;
                $buildRequest->comp_id = $company->id;
                $buildRequest->save();

                return encrypt($buildRequest->id);
            }

            return encrypt($buildRequest->id);
        } catch (DecryptException $e) {
            return $this->invaliData();
        }
    }

    private function getPrompt($id, $company_name, $street_address, $city, $state)
    {
        $prompt = MotionPrompt::find($id);
        $generated = str_replace('[COMPANY_NAME]', $company_name, $prompt->prompt);
        $generated = str_replace('[STREET_ADDRESS]', $street_address, $generated);
        $generated = str_replace('[CITY]', $city, $generated);
        $generated = str_replace('[STATE]', $state, $generated);
        return $generated . " " . $prompt->expected_response;
    }

    private function callChatSonic($query)
    {
        $client = new Client();
        $response = $client->request('POST', 'https://api.writesonic.com/v2/business/content/chatsonic?engine=premium', [
            'body' => '{"enable_google_results":"true","enable_memory":false,"input_text":"' . $query . ' "}',
            'headers' => [
                'X-API-KEY' => config('motion.chatsonic_key'),
                'accept' => 'application/json',
                'content-type' => 'application/json',
            ],
        ]);

        $response = json_decode($response->getBody(), true);

        return $response['message'];
    }

    private function checkIfAccountExists($email)
    {
        return User::where(['email' => $email])->first() ? true : false;
    }
}
