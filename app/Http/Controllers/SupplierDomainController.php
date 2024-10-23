<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use App\Services\SupplierDomainService;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SupplierDomainController extends Controller
{
    protected $supplierDomainService;

    public function __construct(SupplierDomainService $supplierDomainService)
    {
        $this->supplierDomainService = $supplierDomainService;
    }

    /**
     * Display a listing of the suppliers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $perPage = $request->input('per_page', 10);
        $companyId = $request->input('comp_id');

        $query = Supplier::whereHas('companies', function ($query) use ($companyId) {
            $query->where('companies.id', $companyId);
        })
            ->with('domains');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('email', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        $suppliers = $query->paginate($perPage);

        return response()->json($suppliers);
    }

    /**
     * Assign the given domains to the given suppliers. The given arrays must match one to one.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function assign(Request $request)
    {
        $request->validate([
            'supplier_ids' => 'required|array',
            'domain_ids' => 'required|array',
        ]);

        $supplierIds = $request->input('supplier_ids');
        $domainIds = $request->input('domain_ids');

        DB::beginTransaction();

        try {
            $this->supplierDomainService->assignDomainsToSuppliers($supplierIds, $domainIds);
            DB::commit();
            return response()->json(['message' => 'Domains assigned successfully'], 200);
        } catch (Exception $e) {
            DB::rollback();
            Log::error("an error occurred while assigning domains to suppliers: " . $e->getMessage());
            return response()->json(['message' => 'Failed to assign domains'], 500);
        }

        return response()->json(['message' => 'Domains assigned successfully'], 200);
    }
}
