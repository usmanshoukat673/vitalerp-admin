<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use App\Models\SupplierLocation;
use App\Services\SupplierLocationService;
use App\Services\SupplierService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SupplierController extends Controller
{

    protected $supplierLocationService, $supplierService;

    public function __construct(SupplierLocationService $supplierLocationService, SupplierService $supplierService)
    {
        $this->supplierLocationService = $supplierLocationService;
        $this->supplierService = $supplierService;
    }

    /**
     * Updates the profile of a supplier.
     *
     * @param Request $request
     * @param int $supplierId
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveProfile(Request $request, $supplierId)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|max:255',
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            'country' => 'required|max:255',
            'postal_code' => 'required|max:255',
            'timezone' => 'nullable|max:255',
            'website' => 'nullable|max:255',
            'description' => 'nullable|max:255',

        ]);

        $user = request()->user();

        $supplier = Supplier::findOrFail($supplierId);

        $supplierDomain = substr(strrchr($supplier->email, "@"), 1);

        $userDomain = substr(strrchr($request->input('email'), "@"), 1);

        if ($supplierDomain !== $userDomain) {
            return response()->json([
                'message' => 'You may modify only the email username. If you need to change the domain name, please contact the application administrator for assistance.',
                'errors' => ['email' => ["You may modify only the email username. If you need to change the domain name, please contact the application administrator for assistance."]]
            ], 422);
        }

        DB::beginTransaction();

        try {

            $supplier->name = $request->input('name');
            $supplier->email = $request->input('email');
            $supplier->address = $request->input('address');
            $supplier->city = $request->input('city');
            $supplier->state = $request->input('state');
            $supplier->country = $request->input('country');
            $supplier->postal_code = $request->input('postal_code');
            $supplier->timezone = $request->input('timezone');
            $supplier->website = $request->input('website');
            $supplier->description = $request->input('description');
            $supplier->phone = $request->input('phone');
            $supplier->updated_by = $user->id;
            $supplier->save();

            // $this->storeActivity($supplier->id, $user->id, 'Update', 'general_settings', 'Supplier General Settings', 'Updated Company General Settings', $supplier->id, 'App\Models\Supplier');
            $default_location = (int) $request->input('default_location');
            $current_default_location = $this->supplierLocationService->getDefaultLocation($supplierId);

            if ($current_default_location && $default_location !== $current_default_location->id) {
                SupplierLocation::where(['supplier_id' => $supplierId, 'id' => $default_location])->update(['default' => 1]);
                SupplierLocation::where(['supplier_id' => $supplierId, 'id' => $current_default_location->id])->update(['default' => 0]);
                // $this->storeActivity($company->id, $user->id, 'Update', 'location_change', 'Supplier General Settings', 'Change Supplier default location.', $default_location, 'App\Models\SupplierLocation');
            }
            else{
                SupplierLocation::where(['supplier_id' => $supplierId, 'id' => $default_location])->update(['default' => 1]);
                // $this->storeActivity($company->id, $user->id, 'Update', 'location_change', 'Supplier General Settings', 'Change Supplier default location.', $default_location, 'App\Models\SupplierLocation');
            }

            

            DB::commit();

            return response()->json(['supplier' => $supplier, 'default_location' => $this->supplierLocationService->getDefaultLocation($supplierId)], 200);
        } catch (Exception $e) {
            DB::rollback();
            Log::error('Failed to update supplier profile: ' . $e->getMessage());
            return response()->json(['error' => 'Failed to update supplier profile'], 500);
        }
    }
}
