<?php

namespace App\Http\Controllers\Org;

use App\Models\Company;
use App\Http\Controllers\Controller;
use App\Models\UserCompanies;
use Illuminate\Http\Request;

class PasswordSecurity extends Controller
{
    public function savePwdDuration(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'duration' => 'required|integer',
        ]);

        // TODO: make sure it is correct user

        $duration = $request->input('duration');

        if ($duration > 90) {
            return response()->json(['errors' => ['duration' => ['Password Rotation should not be grether than 90 days.']]], 422);
        }

        $user = $request->user();

        $company = Company::find($request->input('comp_id'));
        $company->pwd_exp_duration = $duration;
        $company->save();

        if (!$company) {
            return response()->json(['NOT FOUND'], 404);
        }

        $companies = UserCompanies::with('company')->where(['user_id' => $user->id])->get();

        $company = UserCompanies::with('company')->where(['comp_id' => $company->id, 'user_id' => $user->id])->first();

        return response()->json(['message' => '', 'company' => $company, 'companies' => $companies], 200);
    }
}
