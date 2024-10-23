<?php


namespace App\Services;

use App\Models\CountryCode;
use App\Models\CountryState;
use App\Models\Ethnicity;
use App\Models\NaicsCode;
use App\Models\QualityCert;
use App\Models\Socioeconomic;

class ValidValuesService
{

    public function states($order = 'asc')
    {
        return CountryState::select('id', 'name')->orderBy('name', $order)->get();
    }

    public function countries($order = 'asc')
    {
        $countries = CountryCode::select('id', 'name', 'appha2_code', 'numeric_code')->orderBy('name', $order)->get();
        $us = $countries->where('appha2_code', 'US')->where('numeric_code', 840)->first();
        $countries = $countries->where('appha2_code', '!=', 'US')->where('numeric_code', '!=', 840);
        $countries->prepend($us);

        return $countries;
    }

    public function naicsCodes()
    {
        return NaicsCode::select('id', 'naics_code', 'naics_industry_description')->get();
    }

    public function socioenomicList()
    {
        return Socioeconomic::select('id', 'name')->get();
    }

    public function ethnicityList()
    {
        return Ethnicity::select('id', 'name')->get();
    }

    public function qualityCerts()
    {
        return QualityCert::select('id', 'name')->get();
    }

    public function compliantReqs()
    {
        return [
            ['id' => 1, 'name' => 'DFAR Compliant to NIST 800-171 Cyber Security'],
            ['id' => 2, 'name' => 'Cybersecurity Maturity Model Certification (CMMC) - Level 1'],
        ];
    }

    public function securityLevels()
    {
        return [
            ['id' => 4, 'name' => 'No Classification'],
            ['id' => 1, 'name' => 'Confidential'],
            ['id' => 2, 'name' => 'Secret'],
            ['id' => 3, 'name' => 'Top-Secret'],
        ];
    }
}