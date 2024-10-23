<?php

namespace App\Http\Controllers\PolicyPortal;

use App\Http\Controllers\Controller;
use App\Models\UserCompanies;
use Illuminate\Http\Request;

class PolicyPanelUserController extends Controller
{
    public function hasAccount()
    {
        $user_id = request()->user()->id;

        $flag = UserCompanies::where(['user_id' => $user_id])->first() ? true : false;

        return response(['flag' => $flag], 200);
    }
}
