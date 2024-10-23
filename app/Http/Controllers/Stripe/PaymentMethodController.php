<?php

namespace App\Http\Controllers\Stripe;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function create(Request $request){
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
        ]);

        $company = Company::find($request->input('comp_id'));
    }

    public function list(Request $request)
    {

    }

     public function update(Request $request)
    {

    }

    public function delete(Request $request)
    {

    }
}
