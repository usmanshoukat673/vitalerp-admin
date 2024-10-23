<?php

namespace App\Http\Controllers;

use App\Traits\PasswordRotation;
use Carbon\Carbon;
use Illuminate\Http\Request;

class AgreementController extends Controller
{

    use PasswordRotation;

    /**
     * Accept the agreement and redirect to the correct page based on the user status
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function acceptAgreement(Request $request)
    {
        $user = $request->user();

        $user->agreement_accepted = 1;
        $user->agreement_accepted_at = Carbon::now();
        $user->save();

        [$user, $userSupplier, $companies, $pwd_rotaion, $maturity_levels] = $this->getUserData($user);

        $redirect = '/select-organization';

        if ($user->changed_password === 0) {
            $redirect = '/user/change-password';
        }

        if ($pwd_rotaion['pwd_warning'] === 2) {
            $redirect = '/user/password-expired';
        }

        return response()->json([
            'redirect' => $redirect,
            'message' => 'Agreement accepted',
            'pwd_rotaion' => $pwd_rotaion,
            'companies' => $companies,
            'maturity_levels' => $maturity_levels,
            'supplier' => $userSupplier,
            'user' => $user
        ], 200);
    }
}
