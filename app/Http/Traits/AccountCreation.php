<?php

namespace App\Http\Traits;

use App\Jobs\UserTokenHandler;
use App\Models\Company;
use App\Models\CompanyLocation;
use App\Models\PanelUserActivities;
use App\Models\User;
use App\Models\UserCompanies;
use App\Models\UserLocation;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

trait AccountCreation
{

    protected function create(array $data, $password)
    {
        $user = User::where(['email' => $data['email'], 'only_panel' => 1])->first();
        
        if (!$user) {
            $user = User::create([
                'first_name' => ucfirst($data['first_name']),
                'last_name' => ucfirst($data['last_name']),
                'email' => $data['email'],
                'password' => Hash::make($password),
            ]);
        }
        else{
            $user->only_panel = 0;
            $user->save();
            // save activity 
            PanelUserActivities::create(['user_id' => $user->id, 'description' => 'Converted from Policy Panel user to active user']);
        }

        $this->createCompany($data['company_name'], $user);

        return $user;
    }

    protected function createEmptyUser(array $data)
    {
        $user = User::create([
            'first_name' => ucfirst($data['first_name']),
            'last_name' => ucfirst($data['last_name']),
            'email' => $data['email'],
            'password' => Hash::make(array_key_exists('password', $data) ? $data['password'] : Str::random(8)),
        ]);

        $this->assignCompany($user, $data['comp_id'], $data['assigned_by']);

        return $user;
    }

    protected function createCompany($name, $user, $city = null, $state = null)
    {
        $company = Company::create([
            'name' => $name,
            'email' => $user->email,
            'created_by' => $user->id,
            'city' => $city,
            'state' => $state
        ]);

        // create default location
        $location = CompanyLocation::create([
            'comp_id' => $company->id,
            'name' => $name,
            'created_by' => $user->id,
            'default' => true
        ]);

        $this->assignCompany($user, $company->id, $user->id);

        $this->assignLocation($user, $company, $location);

        UserTokenHandler::dispatch($user->id, $company->id);

        return $company;
    }

    protected function assignCompany($user, $comp_id, $assigned_by)
    {
        return UserCompanies::create([
            'user_id' => $user->id,
            'comp_id' => $comp_id,
            'role' => 'A',
            'assigned_by' => $assigned_by
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

    private function invaliData()
    {
        return response()->json(['errors' => ['build_id' => ['Invalid verification link']]], 422);
    }
}
