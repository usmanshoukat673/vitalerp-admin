<?php

namespace App\Http\Controllers;

use App\Jobs\HandleDeviceIP;
use App\Models\UserCompanyDevices;
use App\Models\Watch\WatchDevice;
use Illuminate\Http\Request;
use hisorange\BrowserDetect\Parser as Browser;

class DeviceLocationFixerController extends Controller
{
    /**
     * Update the users existing device ip & location details accordingly
     *
     * @param Request $request
     * @return void
     */
    public function updateIP(Request $request)
    {
        // in this case we needs to find the one and only device user has
        // and update the ip address to the new one
        // and submit the event to detect ip change
        // will aks dashboard to load devices again
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id'
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');

        $device = WatchDevice::where(['user_id' => $user->id, 'auto_created' => true])->first();

        return $this->handleUpdateOperation($request, $device, $comp_id);
    }

    /**
     * Update the given devices location details
     *
     * @param Request $request
     * @return void
     */
    public function updateDevice(Request $request)
    {
        // in this case user will provide us a device which is working from
        // we just needs to update that device with the current ip
        // and submit the event to detect ip change
        // will aks dashboard to load devices again
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'device_id' => 'required|exists:watch_devices,id',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $device_id = $request->input('device_id');

        $device = WatchDevice::where(['user_id' => $user->id, 'id' => $device_id])->first();

        return $this->handleUpdateOperation($request, $device, $comp_id);
    }

    public function handleUpdateOperation($request, $device, $comp_id)
    {
        $browser = Browser::browserFamily();
        $browser_major_version = Browser::browserVersionMajor();
        $browser_minor_version = Browser::browserVersionMinor();
        $browser_patch_version = Browser::browserVersionPatch();

        $device->public_ip = $request->ip();
        $device->browser = $browser;
        $device->browser_major_version = $browser_major_version;
        $device->browser_minor_version = $browser_minor_version;
        $device->browser_patch_version = $browser_patch_version;
        $device->save();

        HandleDeviceIP::dispatch($device);

        $devices = UserCompanyDevices::with('device')->where(['comp_id' => $comp_id, 'auto_created' => true])->get();
        if (request()->wantsJson()) {
            return response()->json(['devices' => $devices], 200);
        }
    }

    /**
     * Create new device and assign to the company with new location details
     *
     * @param Request $request
     * @return void
     */
    public function assignNewDevice(Request $request)
    {
        // in this case it will be a new device
        // so create new device for user
        // assign it company
        // submit event to find ip details
        // will aks dashboard to load devices again
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'location' => 'required'
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $location = $request->input('location');
        $os = Browser::platformFamily();
        $os_major_version = Browser::platformVersionMajor();
        $os_minor_version = Browser::platformVersionMinor();
        $os_patch_version = Browser::platformVersionPatch();
        $browser = Browser::browserFamily();
        $browser_major_version = Browser::browserVersionMajor();
        $browser_minor_version = Browser::browserVersionMinor();
        $browser_patch_version = Browser::browserVersionPatch();

        $platform = '';

        if (Browser::isWindows()) {
            $platform = 'windows';
        } else if (Browser::isLinux()) {
            $platform = 'linux';
        } else if (Browser::isMac()) {
            $platform = 'mac';
        } else if (Browser::isAndroid()) {
            $platform = 'android';
        } else {
            $platform = 'other';
        }

        $device = WatchDevice::create([
            'user_id' => $user->id,
            'public_ip' => $request->ip(),
            'operating_system' => $os,
            'os_major_version' => $os_major_version,
            'os_minor_version' => $os_minor_version,
            'os_patch_version' => $os_patch_version,
            'browser' => $browser,
            'browser_major_version' => $browser_major_version,
            'browser_minor_version' => $browser_minor_version,
            'browser_patch_version' => $browser_patch_version,
            'auto_created' => true,
            'platform' => $platform
        ]);

        UserCompanyDevices::create([
            'user_id' => $user->id,
            'comp_id' => $comp_id,
            'device_id' => $device->id,
            'auto_created' => true,
            'location_type' => $location,
            'nickname' => $user->first_name . "'s " . $os
        ]);

        HandleDeviceIP::dispatch($device);

        $devices = UserCompanyDevices::with('device')->where(['comp_id' => $comp_id, 'auto_created' => true])->get();
        if (request()->wantsJson()) {
            return response()->json(['devices' => $devices], 200);
        }

        return $devices;
    }
}
