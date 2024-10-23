<?php

namespace App\Http\Controllers;

use App\Mail\PolicyPanelShared;
use App\Models\Company;
use App\Models\PanelUserActivities;
use App\Models\PanelUserRequest;
use App\Models\PolicyPortal;
use App\Models\SharedStandard;
use App\Models\Standard;
use App\Models\StandardSharedWith;
use App\Models\User;
use App\Models\UserCompanies;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class CompliancePolicyPortalController extends Controller
{

    public function switch()
    {
        $comp_id = request('comp_id');

        $shared_standards = StandardSharedWith::with('standard')->where([
            'comp_id' => $comp_id,
            'user_id' => request()->user()->id
        ])->get();

        $shared_company = Company::select('id', 'name', 'logo')->find($comp_id);

        return response()->json([
            'shared_standards' => $shared_standards,
            'shared_company' => $shared_company
        ], 200);
    }

    public function shared($standard_id)
    {
        $comp_id = request('comp_id');

        $users = StandardSharedWith::select('id', 'user_id')->with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'email', 'only_panel');
        }])->where(['standard_id' => $standard_id, 'comp_id' => $comp_id])->get();

        $all_users = UserCompanies::with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'email', 'only_panel');
        }])
            ->where(['comp_id' => $comp_id])
            ->get();

        return response()->json(['currently_shared' => $users, 'all_users' => $all_users]);
    }

    public function share(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required|exists:standards,id',
            'users' => ['required', 'array']
        ]);

        $comp_id = request('comp_id');
        $standard_id = $request->input('standard_id');
        $users = (array) $request->input('users');

        if (!SharedStandard::where(['comp_id' => $comp_id, 'standard_id' => $standard_id])->first()) {
            SharedStandard::create(['comp_id' => $comp_id, 'standard_id' => $standard_id]);
        }

        $policyPanel = PolicyPortal::where(['comp_id' => $comp_id])->first();
        $company = Company::select('id', 'name')->find($comp_id);

        if (count($users) > 0) {
            foreach ($users as $user_id) {
                $this->shareStandardWith($user_id, $standard_id, $comp_id, $policyPanel->link, $company->name);
            }
        }

        return StandardSharedWith::select('id', 'user_id')->with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'email', 'only_panel');
        }])->where(['standard_id' => $standard_id, 'comp_id' => $comp_id])->get();
    }

    private function shareStandardWith($user_id, $standard_id, $comp_id, $portal_link, $company_name)
    {
        if (!StandardSharedWith::where([
            'comp_id' => $comp_id,
            'user_id' => $user_id,
            'standard_id' => $standard_id
        ])->first()) {
            StandardSharedWith::create([
                'comp_id' => $comp_id,
                'user_id' => $user_id,
                'standard_id' => $standard_id
            ]);

            $user = User::select('id', 'email')->find($user_id);

            $standard = Standard::find($standard_id);

            $message = (new PolicyPanelShared([
                'company_name' => $company_name,
                'portal_link' => $portal_link,
                'email' => $user->email,
                'standard_name' => $standard->name
            ]))->onQueue(config('motion.DEFAULT_QUEUE'));
            Mail::to($user->email)->queue($message);
        }
    }

    public function add_portal_user(Request $request)
    {
        $this->validate($request, [
            'email' => ['required', 'string', 'email', 'max:255'],
            'standard_id' => 'required|exists:standards,id'
        ]);

        $email = $request->input('email');

        // check if user is exists 
        $user = User::select('id', 'first_name', 'last_name', 'email', 'only_panel')->where(['email' => $email])->first();

        if (!$user) {
            $password =  Str::random(8);

            $user = User::create([
                'first_name' => '[Not Set]',
                'last_name' => '[Not Set]',
                'email' => $email,
                'password' => Hash::make($password),
                'only_panel' => 1
            ]);

            PanelUserActivities::create(['user_id' => $user->id, 'description' => 'Panel User Created for ' . request('comp_id')]);
        }

        if (!PanelUserRequest::where([
            'comp_id' => request('comp_id'),
            'standard_id' => $request->input('standard_id'),
            'email' => $user->email,
            'used' => 0
        ])->first()) {
            PanelUserRequest::create([
                'requested_by' => $request->user()->id,
                'comp_id' => request('comp_id'),
                'standard_id' => $request->input('standard_id'),
                'email' => $user->email
            ]);
        }

        return $user;
    }
}
