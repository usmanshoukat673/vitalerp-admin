<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Models\ThirdParty;
use Illuminate\Http\Request;

class ThirdPartyController extends Controller
{
    use CompanyCommons;

    public function add(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'name' => 'required|max:255',
            'email' => 'required|max:255|email:rfc',
        ]);

        if ($this->hasNameTaken($request)) {
            return response()->json(['errors' => [['name' => 'Third Party with the given name already exists!']]], 422);
        }

        if ($this->hasNameTaken($request)) {
            return response()->json(['errors' => [['email' => 'Third Party with the given email already exists!']]], 422);
        }

        $user = request()->user();

        $thirdparty = ThirdParty::create([
            'name' => $request->input('name'),
            'comp_id' => $request->input('comp_id'),
            'created_by' => $user->id,
            'email' => $request->input('email'),
        ]);

        $this->storeActivity(
            $request->input('comp_id'),
            $user->id,
            'Create',
            'thirdparty_create',
            'Third Party',
            'Created new Third Party',
            $thirdparty->id,
            'App\Models\ThirdParty'
        );

        if (request()->wantsJson()) {
            return response()->json(['thirdparty' => $thirdparty], 200);
        }

        return $thirdparty;
    }

    public function hasNameTaken($request)
    {
        return  ThirdParty::where(['name' => $request->input('name'), 'comp_id' => $request->input('comp_id')])->first();
    }

    public function hasEmailTaken($request)
    {
        return  ThirdParty::where(['email' => $request->input('email'), 'comp_id' => $request->input('comp_id')])->first();
    }
}
