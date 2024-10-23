<?php

namespace App\Http\Controllers;

use App\Models\UserCompanyDevices;
use App\Models\Watch\Directory;
use App\Models\Watch\DirectoryActivities;
use App\Models\Watch\WatchServiceStats;
use Illuminate\Http\Request;

class DeviceWatchController extends Controller
{
    /**
     * List User Devices based on company id
     *
     * @param [type] $comp_id
     * @return JSON [{devices: []}]
     */
    public function devices($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $auto_created = (bool) request()->get('auto_created');

        $user = request()->user();

        #TODO: needs to check the roles

        $devices = UserCompanyDevices::with('device')->where(['comp_id' => $comp_id, 'auto_created' => false])->get();
        if (request()->wantsJson()) {
            return response()->json(['devices' => $devices], 200);
        }
    }

    public function directories($device_id, $comp_id)
    {
        if (!$device_id) {
            abort(404);
        }

        $user = request()->user();

        #TODO: needs to check the roles

        $directories = Directory::with('ativities')->where(['device_id' => $device_id, 'comp_id' => $comp_id])->get();

        if (request()->wantsJson()) {
            return response()->json(['directories' => $directories], 200);
        }
    }

    public function stats($device_id)
    {
        if (!$device_id) {
            abort(404);
        }

        $user = request()->user();

        $stats = WatchServiceStats::where(['device_id' => $device_id])
            ->orderBy('event_date', 'desc')
            ->paginate(5);

        if (request()->wantsJson()) {
            return response()->json(['stats' => $stats], 200);
        }
    }

    public function nickname(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|exists:watch_devices,id',
            'comp_id' => 'required|exists:companies,id',
            'nickname' => 'required',
        ]);

        $user = request()->user();

        $comp_id = $request->input('comp_id');
        $device_id = $request->input('device_id');
        $nickname = $request->input('nickname');

        $device = UserCompanyDevices::where(['comp_id' => $comp_id, 'user_id' => $user->id, 'device_id' => $device_id])->first();

        if ($device) {

            UserCompanyDevices::where(['comp_id' => $comp_id, 'user_id' => $user->id, 'device_id' => $device_id])
                ->update(['nickname' => $nickname]);

            $device = UserCompanyDevices::with('device')->where(['comp_id' => $comp_id, 'user_id' => $user->id, 'device_id' => $device_id])->first();

            if (request()->wantsJson()) {
                return response()->json(['device' => $device], 200);
            }

            return $device;
        } else {
            return response()->json(['message' => "Device not found."], 404);
        }
    }

    public function remove(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|exists:watch_devices,id',
            'comp_id' => 'required|exists:companies,id',
        ]);

        $user = request()->user();

        # remove from company listing
        # remove directories
        # remove directories activities

        $device_id = $request->input('device_id');
        $comp_id = $request->input('comp_id');

        UserCompanyDevices::where(['device_id' => $device_id, 'comp_id' => $comp_id, 'user_id' => $user->id])->delete();

        $directories = Directory::select('id')->where(['device_id' => $device_id, 'comp_id' => $comp_id, 'user_id' => $user->id])->get();

        if (count($directories) > 0) {
            foreach ($directories as $directory) {
                DirectoryActivities::where(['directory_id' => $directory->id])->delete();
            }
        }

        Directory::where(['device_id' => $device_id, 'comp_id' => $comp_id, 'user_id' => $user->id])->delete();

        return response()->json(['message' => "Device removed!"], 200);
    }

    public function setDeviceType(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|exists:watch_devices,id',
            'comp_id' => 'required|exists:companies,id',
            'location_type' => 'required',
        ]);

        $user = request()->user();

        $device_id = $request->input('device_id');
        $comp_id = $request->input('comp_id');
        $location_type = $request->input('location_type');

        UserCompanyDevices::where(['device_id' => $device_id, 'comp_id' => $comp_id])->update(['location_type' => $location_type]);

        $device = UserCompanyDevices::with('device')->where(['comp_id' => $comp_id, 'device_id' => $device_id])->first();

        if (request()->wantsJson()) {
            return response()->json(['device' => $device], 200);
        }
    }
}
