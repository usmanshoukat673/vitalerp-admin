<?php

namespace App\Http\Controllers;

use App\Exports\Reports\SOAExport;
use App\Models\StandardSection;
use Illuminate\Http\Request;
use Excel;

class SOAReportController extends Controller
{
    public function generate(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'standard_id' => 'required',
            'name' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $name = $request->input('name');

        $parent_sections = StandardSection::select('id', 'menu_name', 'abbreviation')
            ->with(['sections.controls' => function ($q) use ($comp_id) {
                $q->select('id', 'name', 'number', 'short_name', 'standard_section_id')
                    ->with(['applicability' => function ($query) use ($comp_id) {
                        $query->where(['comp_id' => $comp_id]);
                    }])
                    ->with(['the_artifacts' => function ($query) use ($comp_id) {
                        $query->where(['comp_id' => $comp_id])
                            ->with(['document' => function ($doc) {
                                $doc->select('id', 'name', 'type', 'ext');
                            }]);
                    }]);
            }])
            ->where(['parent' => null])
            ->where(['standard_id' => $standard_id])
            ->get();


        return Excel::download(new SOAExport($parent_sections), $name . '_SOA_Report.xlsx');
    }
}
