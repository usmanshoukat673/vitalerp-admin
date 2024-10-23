<?php

namespace App\Http\Controllers;

use App\Models\NaicsCode;
use Illuminate\Http\Request;

class NAICSCodeController extends Controller
{
    /**
     * Get list of naics codes with optional search by naics code or industry description.
     *
     * @queryParam search string Search by naics code or industry description.
     *
     * @return \Illuminate\Http\Response
     */
    public function naicsCodes()
    {
        $search = request()->query('search');

        $query = NaicsCode::select('id', 'naics_code', 'naics_industry_description');

        if ($search) {
            $query->where('naics_code', 'like', "%{$search}%")
                ->orWhere('naics_industry_description', 'like', "%{$search}%");
        }

        $naicsCodes = $query->get();
        return response()->json($naicsCodes, 200);
    }
}
