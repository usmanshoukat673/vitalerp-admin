<?php

namespace App\Http\Controllers\Org;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Models\CompanyLocation;
use App\Models\UserCompanies;

class TimeZoneSettings extends Controller
{
    public function getTzList($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        //TODO: Needs to make sure whether user has ability to make changes to this org

        $user = request()->user();

        $company = Company::find($comp_id);

        $default_location = CompanyLocation::where(['comp_id' => $comp_id, 'default' => true])->first();

        // if ($company && $company->timezone == '') {
        //     $usertz = request()->input('usertz');
        //     $company->timezone = $usertz;
        //     $company->save();
        //     $company = UserCompanies::with('company')->where(['comp_id' => $comp_id, 'user_id' => $user->id])->first();
        //     $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        //     if (request()->wantsJson()) {
        //         return response()->json(['company' => $company, 'companies' => $companies, 'default_location' => $default_location]);
        //     }
        // }

        if (request()->wantsJson()) {
            return response()->json(['default_location' => $default_location]);
        }

        return $company;
    }
}
