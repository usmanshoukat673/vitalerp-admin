<?php

namespace App\Http\Controllers\Org;

use App\Http\Controllers\Controller;
use App\Http\Traits\CompanyCommons;
use App\Models\CompanyLocation;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    use CompanyCommons;

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function list($comp_id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$comp_id) {
            abort(404);
        }

        $user = request()->user();

        $locations = CompanyLocation::where(['comp_id' => $comp_id])->paginate(10);

        if (request()->wantsJson()) {
            return response()->json(['locations' => $locations], 200);
        }

        return $locations;
    }

    public function addLocation(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'name' => 'required|max:255|unique:company_locations,name,null,id,comp_id,' . $request->input('comp_id'),
            'address' => 'required|max:255',
            'city' => 'required|max:255',
            'state' => 'required|max:255',
            'country' => 'required|max:255',
            'postal_code' => 'required|max:255',
            'timezone' => 'required|max:255',
        ]);

        if ($this->hasNameTaken($request)) {
            return response()->json(['errors' => [['name' => 'Location with the given name already exists!']]], 422);
        }

        $user = request()->user();

        $location = CompanyLocation::create([
            'name' => $request->input('name'),
            'comp_id' => $request->input('comp_id'),
            'created_by' => $user->id,
            'address' => $request->input('address'),
            'city' => $request->input('city'),
            'state' => $request->input('state'),
            'country' => $request->input('country'),
            'postal_code' => $request->input('postal_code'),
            'timezone' => $request->input('timezone'),
            'default' => false
        ]);

        $this->storeActivity(
            $request->input('comp_id'),
            $user->id,
            'Create',
            'location_create',
            'Locations',
            'Created new location',
            $location->id,
            'App\Models\CompanyLocation'
        );

        if (request()->wantsJson()) {
            return response()->json(['location' => $location], 200);
        }

        return $location;
    }

    public function getAllLocations($comp_id)
    {
        return CompanyLocation::where(['comp_id' => $comp_id])->orderby('name', 'asc')->get();
    }

    public function saveLocationChanges(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'name' => 'required|max:255|unique:company_locations,name,' . $request->input('location_id') . ',id,comp_id,' . $request->input('comp_id'),
        ]);

        if ($this->hasNameTakenOnUpdate($request)) {
            return response()->json(['errors' => [['name' => 'Location with the given name already exists!']]], 422);
        }

        $user = request()->user();

        $location = CompanyLocation::where(
            [
                'comp_id' => $request->input('comp_id'),
                'id' => $request->input('location_id'),
            ]
        )->first();

        if ($location) {

            $location->name = $request->input('name');
            $location->address = $request->input('address');
            $location->city = $request->input('city');
            $location->state = $request->input('state');
            $location->country = $request->input('country');
            $location->postal_code = $request->input('postal_code');
            $location->timezone = $request->input('timezone');
            $location->save();

            // told
            $this->storeActivity(
                $request->input('comp_id'),
                $user->id,
                'Update',
                'location_updated',
                'Locations',
                'Updated location details',
                $location->id,
                'App\Models\CompanyLocation'
            );

            if (request()->wantsJson()) {
                return response()->json(['location' => $location], 200);
            }

            return $location;
        } else {
            abort(404);
        }
    }

    public function hasNameTaken($request)
    {
        return  CompanyLocation::where(['name' => $request->input('name'), 'comp_id' => $request->input('comp_id')])->first();
    }

    public function hasNameTakenOnUpdate($request)
    {
        return  CompanyLocation::where(['name' => $request->input('name'), 'comp_id' => $request->input('comp_id')])
            ->where('id', '!=', $request->input('location_id'))
            ->first();
    }
}
