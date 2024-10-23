<?php

namespace App\Http\Controllers\Org;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Http\Traits\CompanyCommons;
use App\Jobs\UserTokenHandler;
use App\Models\CompanyLocation;
use App\Models\GlobalActivities;
use App\Models\User;
use App\Models\UserAssigns;
use App\Models\UserCompanies;
use App\Models\UserLocation;
use Illuminate\Http\Request;
use Image;

class OrgManager extends Controller
{

    use CompanyCommons;

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $user = $request->user();

        $user = User::with(['companies.company', 'companies.company' => function ($query) {
            $query->withCount('users');
        }])->find($user->id);

        if ($request->wantsJson()) {
            return response()->json(['companies' => $user->companies], 200);
        }
    }

    public function listUsers($id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$id) {
            abort(404);
        }

        $user = request()->user();

        $users = UserCompanies::with('user', 'company')->where(['comp_id' => $id])->paginate(5);

        if (request()->wantsJson()) {
            return response()->json(['users' => $users], 200);
        }

        return $users;
    }

    public function listAllUsers($id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$id) {
            abort(404);
        }

        $user = request()->user();

        $users = UserCompanies::with('user', 'company')->where(['comp_id' => $id])->get();

        if (request()->wantsJson()) {
            return response()->json(['users' => $users], 200);
        }

        return $users;
    }

    public function listInvites($id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$id) {
            abort(404);
        }

        $user = request()->user();

        $invites = UserAssigns::where(['assigned_by' => $user->id, 'assigned_to' => $id])->paginate(5);

        if (request()->wantsJson()) {
            return response()->json(['invites' => $invites], 200);
        }

        return $invites;
    }

    public function add(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
        ]);

        $user = $request->user();

        $company = $this->createCompany($request, $user);

        $company = UserCompanies::with('company')->where(['comp_id' => $company->id, 'user_id' => $user->id])->first();
        $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        UserTokenHandler::dispatch($user->id, $company->id);

        if ($request->wantsJson()) {
            return response()->json(['message' => '', 'company' => $company, 'companies' => $companies], 200);
        }
    }

    public function saveBasics(Request $request)
    {
        //TODO: Needs to make sure that the user is able to save changes or not depending on the role of the user

        $this->validate($request, [
            'name' => 'required',
            'email' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'default_location' => 'required|exists:company_locations,id',
        ]);

        $user = $request->user();

        $company = Company::find($request->input('comp_id'));

        if (!$company) {
            return response()->json(['NOT FOUND'], 404);
        }

        $domain = substr(strrchr($company->email, "@"), 1);

        $requestedDomain = substr(strrchr($request->input('email'), "@"), 1);

        if ($domain !== $requestedDomain) {
            return response()->json([
                'message' => 'You may modify only the email username. If you need to change the domain name, please contact the application administrator for assistance.',
                'errors' => ['email' => ["You may modify only the email username. If you need to change the domain name, please contact the application administrator for assistance."]]
            ], 422);
        }

        $company->name = $request->input('name');
        $company->email = $request->input('email');
        $company->address = $request->input('address');
        $company->city = $request->input('city');
        $company->state = $request->input('state');
        $company->country = $request->input('country');
        $company->postal_code = $request->input('postal_code');
        $company->timezone = $request->input('timezone');
        $company->website = $request->input('website');
        $company->description = $request->input('description');
        $company->save();

        $this->storeActivity($company->id, $user->id, 'Update', 'general_settings', 'General Settings', 'Updated Company General Settings', $company->id, 'App\Models\Company');

        $default_location = (int) $request->input('default_location');

        $current_default_location = CompanyLocation::where(['comp_id' => $company->id, 'default' => true])->first();

        if ($current_default_location && $default_location !== $current_default_location->id) {
            CompanyLocation::where(['comp_id' => $company->id, 'id' => $default_location])
                ->update([
                    'default' => true
                ]);
            CompanyLocation::where(['comp_id' => $company->id, 'id' => $current_default_location->id])
                ->update([
                    'default' => false
                ]);

            $this->storeActivity($company->id, $user->id, 'Update', 'location_change', 'General Settings', 'Change Company default location.', $default_location, 'App\Models\CompanyLocation');
        } else {
            CompanyLocation::where(['comp_id' => $company->id, 'id' => $default_location])
                ->update([
                    'default' => true
                ]);
        }

        // $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        // $company = UserCompanies::with('company')->where(['comp_id' => $company->id, 'user_id' => $user->id])->first();

        $default_location = CompanyLocation::where(['comp_id' => $company->id, 'default' => true])->first();

        return response()->json(['message' => '', 'default_location' => $default_location, 'company' => $company], 200);
    }

    protected function createCompany($request, $user)
    {
        $company = Company::create([
            'name' => $request->input('name'),
            'email' => $user->email,
            'address' => $request->input('address'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'country' => $request->input('country'),
            'website' => $request->input('url'),
            'postal_code' => $request->input('postal_code'),
            'created_by' => $user->id
        ]);

        $location = CompanyLocation::create([
            'comp_id' => $company->id,
            'name' => $request->input('name'),
            'created_by' => $user->id,
            'address' => $request->input('address'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'country' => $request->input('country'),
            'website' => $request->input('url'),
            'postal_code' => $request->input('postal_code'),
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
            'role' => 'A',
            'assigned_by' => $user->id
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

    public function updateUser(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'user_id' => 'required|exists:users,id',
            'first_name' => 'required',
            'last_name' => 'required',
            'role' => 'required',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $user_id = $request->input('user_id');
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $role = $request->input('role');

        if (UserCompanies::where(['user_id' => $user->id, 'comp_id' => $comp_id, 'role' => 'A'])->first()) {

            UserCompanies::where(['user_id' => $user_id, 'comp_id' => $comp_id])->update(['role' => $role]);

            User::where(['id' => $user_id])->update(['first_name' => $first_name, 'last_name' => $last_name]);

            $user = UserCompanies::with('user', 'company')->where(['comp_id' => $comp_id, 'user_id' => $user_id])->first();

            return response()->json(['message' => 'Given user has been updated', 'user' => $user], 200);
        } else {
            return response()->json(['message' => 'You are not allowed to make changes!'], 403); # 403 Forbidden
        }
    }

    public function uploadLogo(Request $request)
    {
        $request->validate([
            'comp_id' => 'required|exists:companies,id',
            'logo' => 'required|image|mimes:png|max:2048'
        ]);

        $image = Image::make($request->file('logo'));

        $user = $request->user();

        $company = Company::find($request->input('comp_id'));

        if (!$company) {
            return response()->json(['NOT FOUND'], 404);
        }

        $company->logo = $image->encode('data-url');
        $company->save();

        $this->storeActivity($company->id, $user->id, 'Upload', 'logo_upload', 'General Settings', 'Uloaded new Company Logo.');

        $company = UserCompanies::with('company')->where(['comp_id' => $company->id, 'user_id' => $user->id])->first();

        return response()->json(['message' => '', 'company' => $company], 200);
    }
}
