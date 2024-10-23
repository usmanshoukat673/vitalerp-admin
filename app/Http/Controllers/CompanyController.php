<?php

namespace App\Http\Controllers;

use App\Services\SupplierService;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    protected $supplierService;

    public function __construct(SupplierService $supplierService)
    {
        $this->supplierService = $supplierService;
    }

    /**
     * Get all suppliers associated with a company.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function allSuppliers(Request $request)
    {
        return $this->supplierService->all($request->comp_id);
    }

    /**
     * Search for suppliers associated with a company.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function searchSuppliers(Request $request)
    {
        $search = $request->query('search');

        return $this->supplierService->search($request->comp_id, $search);
    }
}
