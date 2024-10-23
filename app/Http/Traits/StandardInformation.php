<?php

namespace App\Http\Traits;

use App\Models\CompCtrls;

trait StandardInformation
{
    private function getStandardChartInfo(int $comp_id, int $standard_id)
    {
        $applicable = CompCtrls::where(['applicable' => 'Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();


        $not_applicable = CompCtrls::where(['applicable' => 'Not Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $partially_imple = CompCtrls::where(['status' => 'Partially Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $implemented = CompCtrls::where(['status' => 'Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $excluded = CompCtrls::where(['applicable' => 'Excluded'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        return [$applicable, $not_applicable, $partially_imple, $implemented, $excluded];
    }
}
