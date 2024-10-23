<?php

namespace App\Exports\Reports;

use Maatwebsite\Excel\Concerns\FromCollection;

class DocsReportManifestExport implements FromCollection
{

    protected $items;

    public function __construct($items)
    {
        $this->items = $items;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        return $this->items;
    }
}
