<?php

namespace App\Http\Controllers;

use App\Models\SupplierLocation;
use App\Services\SupplierLocationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;
use Illuminate\Support\Facades\Log;

class SupplierLocationController extends Controller
{
    protected $supplierLocationService;

    public function __construct(SupplierLocationService $supplierLocationService)
    {
        $this->supplierLocationService = $supplierLocationService;
    }

    /**
     * Get the default location for the given supplier.
     *
     * @param  int  $supplierId
     * @return \Illuminate\Http\Response
     */
    public function defaultLocation($supplierId)
    {
        return $this->supplierLocationService->getDefaultLocation($supplierId);
    }

    /**
     * Display a listing of the supplier locations.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, $supplierId)
    {
        $query = SupplierLocation::query();

        if ($request->has('search') && $request->input('search') !== '') {
            $search = $request->input('search');
            $query->where('name', 'LIKE', '%' . $search . '%')
                ->orWhere('city', 'LIKE', '%' . $search . '%')
                ->orWhere('address', 'LIKE', '%' . $search . '%')
                ->orWhere('state', 'LIKE', '%' . $search . '%')
                ->orWhere('country', 'LIKE', '%' . $search . '%')
                ->orWhere('postal_code', 'LIKE', '%' . $search . '%');
        }

        $query->where('supplier_id', $supplierId);

        return $query->paginate(10); // or $request->input('per_page', 10)
    }

    /**
     * Get all supplier locations for the given supplier.
     *
     * @param int $supplierId The ID of the supplier.
     * @return \Illuminate\Support\Collection
     */
    public function all($supplierId)
    {
        return SupplierLocation::select('id', 'name')->where('supplier_id', $supplierId)->get();
    }

    /**
     * Store a newly created supplier location in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'supplier_id' => 'required|exists:suppliers,id',
            'name' => 'required|string|max:255|unique:supplier_locations,name,NULL,id,supplier_id,' . $request->supplier_id,
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'default' => 'boolean',
            'timezone' => 'required|string|max:100',
        ]);

        DB::beginTransaction();

        try {
            $data = $request->all();

            $location = $this->supplierLocationService->addLocation($data);

            DB::commit();
            return response()->json(['message' => 'Location added successfully', 'data' => $location], 201);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to add location: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to add location'], 500);
        }
    }

    /**
     * Update the specified supplier location in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // Find the supplier location by id

        $this->validate($request, [
            'name' => 'required|string|max:255|unique:supplier_locations,name,' . $id . ',id,supplier_id,' . $request->supplier_id,
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'state' => 'required|string|max:100',
            'country' => 'required|string|max:100',
            'postal_code' => 'required|string|max:20',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'website' => 'nullable|url|max:255',
            'default' => 'boolean',
            'timezone' => 'required|string|max:100',
        ]);

        DB::beginTransaction();

        try {

            $data = $request->all();

            $location = SupplierLocation::findOrFail($id);

            $location = $this->supplierLocationService->updateLocation($location, $data);

            DB::commit();

            return response()->json(['message' => 'Location updated successfully', 'data' => $location], 200);
        } catch (Exception $e) {
            DB::rollBack();
            Log::error('Failed to update location: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update location'], 500);
        }
    }

    /**
     * Remove the specified supplier location from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();
        try {
            $location = SupplierLocation::findOrFail($id);
            $this->supplierLocationService->deleteLocation($location);
            DB::commit();
            return response()->json(['message' => 'Location deleted successfully'], 200);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete location: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to delete location'], 500);
        }
    }
}
