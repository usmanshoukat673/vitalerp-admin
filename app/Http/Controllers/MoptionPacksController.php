<?php

namespace App\Http\Controllers;

use App\Jobs\AssignFreePlan;
use App\Models\Company;
use App\Models\UserCompanies;
use Illuminate\Http\Request;

class MoptionPacksController extends Controller
{
    public function freePlan(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
        ]);
        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $company = Company::find($comp_id);

        if(!$company)
        {
            abort(404);
        }

        $company->plan = 'free';
        $company->save();

        $company = UserCompanies::with('company')->where(['user_id' => $user->id, 'comp_id' => $comp_id])->first();

        AssignFreePlan::dispatch($comp_id);

        return $company;
    }
}
