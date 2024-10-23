<?php

namespace App\Exports\Reports;

use Maatwebsite\Excel\Concerns\FromView;
use Illuminate\Contracts\View\View;

class SOAExport implements FromView
{
    protected $parent_sections;

    public function __construct($parent_sections)
    {
        $this->parent_sections = $parent_sections;
    }

    public function view(): View
    {
        return view('reports.soa', [
            'parent_sections' => $this->parent_sections
        ]);
    }
}
