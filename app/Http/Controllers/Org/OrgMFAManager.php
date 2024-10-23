<?php

namespace App\Http\Controllers\Org;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Http\Traits\CompanyCommons;
use App\Models\UserCompanies;
use Illuminate\Http\Request;

class OrgMFAManager extends Controller
{

    use CompanyCommons;

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function toggleMFA(Request $request)
    {
        // TODO: Needs to verify that the current is capable of making changes in this company
        $this->validate($request, [
            'required_mfa' => 'required',
            'comp_id' => 'required|exists:companies,id'
        ]);

        $user = $request->user();

        $company = Company::find($request->input('comp_id'));
        $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        if (!$company) {
            return response()->json(['NOT FOUND'], 404);
        }

        $company->required_mfa = $request->input('required_mfa');
        $company->save();

        $this->storeActivity($company->id, $user->id, 'Update', 'mfa_settings', 'Security Settings', 'Changed Multifactor Authentication Settings', $company->id, 'App\Models\Company');

        $company = UserCompanies::with('company')->where(['comp_id' => $company->id, 'user_id' => $user->id])->first();

        return response()->json(['message' => '', 'company' => $company, 'companies' => $companies], 200);
    }
}
