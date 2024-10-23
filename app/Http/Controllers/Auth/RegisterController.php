<?php

namespace App\Http\Controllers\Auth;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Models\CompanyLocation;
use App\Models\PanelUserActivities;
use App\Providers\RouteServiceProvider;
use App\Models\User;
use App\Models\UserCompanies;
use App\Models\UserLocation;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Auth\Events\Registered;
use Illuminate\Validation\Rule;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Show the application registration form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showRegistrationForm()
    {
        return view('auth.register');
    }

    /**
     * Handle a registration request for the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $this->validator($request->all())->validate();

        event(new Registered($user = $this->create($request->all())));

        $this->guard()->login($user);

        if ($response = $this->registered($request, $user)) {
            return $response;
        }

        return $request->wantsJson()
            ? new Response('', 201)
            : redirect($this->redirectPath());
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'company_name' => ['required', 'string', 'max:100'],
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->where(function ($query) {
                $query->where('only_panel', 0); // Apply unique rule only when only_panel is 0
            }),],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $user = User::where(['email' => $data['email'], 'only_panel' => 1])->first();

        if (!$user) {
            $user = User::create([
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);
        } else {
            $user->only_panel = 0;
            $user->save();
            // save activity 
            PanelUserActivities::create(['user_id' => $user->id, 'description' => 'Converted from Policy Panel user to active user']);
        }

        $this->createCompany($data['company_name'], $user);

        return $user;
    }

    protected function createCompany($name, $user)
    {
        $company = Company::create([
            'name' => $name,
            'email' => $user->email,
            'created_by' => $user->id
        ]);

        $location = CompanyLocation::create([
            'comp_id' => $company->id,
            'name' => $name,
            'created_by' => $user->id,
            'default' => true
        ]);

        $this->assignCompany($user, $company->id);

        $this->assignLocation($user, $company, $location);

        return $company;
    }

    protected function assignCompany($user, $comp_id)
    {
        return UserCompanies::create([
            'user_id' => $user->id,
            'comp_id' => $comp_id,
            'role' => 'A'
        ]);
    }

    protected function assignLocation($user, $company, $location)
    {
        return UserLocation::create([
            'user_id' => $user->id,
            'comp_id' => $company->id,
            'assigned_by' => $user->id,
            'location_id' => $location->id,
            'default' => true
        ]);
    }


    // create user
    // create company
    // assign company to user
}
