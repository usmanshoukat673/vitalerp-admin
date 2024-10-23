<?php

namespace App\Traits;

use Illuminate\Support\Collection;

/**
 * Fillter Response before sending it to API
 */
trait APIResponseCleaner
{
    public function cleanUser($user)
    {
        $user = new Collection($user);
        $user->forget('changed_password');
        $user->forget('mfa_reminder');
        $user->forget('phone_verified');
        $user->forget('pwd_rotaion');
        $user->forget('mfa_enabled');
        $user->forget('phone');
        $user->forget('email_verified_at');
        $user->forget('country_code');
        $user->put('mfa_configred', $user->get('watch_number') != "" ? true : false);

        return $user;
    }

    public function cleanCompanies($companies)
    {
        $companies = new Collection($companies);
        // $companies->forget('assigned_by');

        $companies->transform(function ($company) {
            unset($company['company']['document']);
            return $company;
        });

        return $companies;
    }
}
