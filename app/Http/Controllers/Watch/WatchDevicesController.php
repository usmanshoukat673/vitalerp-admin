<?php

namespace App\Http\Controllers\Watch;

use App\Http\Controllers\Controller;
use App\Jobs\HandleDeviceIP;
use App\Models\UserCompanyDevices;
use App\Models\Watch\WatchDevice;
use App\Models\Watch\WatchServiceStats;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WatchDevicesController extends Controller
{
    public function create(Request $request)
    {
        $this->validate($request, [
            'operating_system' => 'required',
            'machine_name' => 'required',
            'username' => 'required',
            'public_ip' => 'required',
            'device_encrypted' => 'required'
        ]);
        $user = $request->user();
        $operating_system = $request->input('operating_system');
        $machine_name = $request->input('machine_name');
        $username = $request->input('username');
        $public_ip = $request->input('public_ip');
        $device_encrypted = $request->input('device_encrypted');

        $user_domain_name = $request->input('user_domain_name');
        $system_directory = $request->input('system_directory');
        $antivirus_status = $request->input('antivirus_status');
        $windows_defender = $request->input('windows_defender');
        $anti_virus_apps = $request->input('anti_virus_apps');
        $domain_firewall = $request->input('domain_firewall');
        $private_firewall = $request->input('private_firewall');
        $public_firewall = $request->input('public_firewall');
        $private_ip = $request->input('private_ip');
        $msoffice_version = $request->input('msoffice_version');
        $browsers = $request->input('browsers');
        $other = $request->input('other');

        $device_id = $request->input('device_id');

        if ($device_id == null) {

            $device =  WatchDevice::where([
                'user_id' => $user->id,
                'operating_system' => $operating_system,
                'machine_name' => $machine_name,
                'username' => $username,
                'system_directory' => $system_directory,
            ])->first();

            if (!$device) {
                $device =  WatchDevice::create([
                    'user_id' => $user->id,
                    'operating_system' => $operating_system,
                    'machine_name' => $machine_name,
                    'user_domain_name' => $user_domain_name,
                    'username' => $username,
                    'public_ip' => $public_ip,
                    'device_encrypted' => $device_encrypted,
                    'system_directory' => $system_directory,
                    'antivirus_status' => $antivirus_status,
                    'windows_defender' => $windows_defender,
                    'anti_virus_apps' => $anti_virus_apps,
                    'domain_firewall' => $domain_firewall,
                    'private_firewall' => $private_firewall,
                    'public_firewall' => $public_firewall,
                    'private_ip' => $private_ip,
                    'msoffice_version' => $msoffice_version,
                    'browsers' => $browsers,
                    'other' => $other,
                ]);
            }

            HandleDeviceIP::dispatch($device);

            return response()->json(['device' => $device], 200);
        } else {
            $device =  WatchDevice::find($device_id);

            if ($device) {
                $device->operating_system = $operating_system;
                $device->machine_name = $machine_name;

                if ($username != 'SYSTEM') {
                    $device->username = $username;
                }

                $device->public_ip = $public_ip;
                $device->device_encrypted = $device_encrypted;
                $device->system_directory = $system_directory;
                $device->antivirus_status = $antivirus_status;
                $device->windows_defender = $windows_defender;
                $device->user_domain_name = $user_domain_name;
                $device->anti_virus_apps = $anti_virus_apps;
                $device->domain_firewall = $domain_firewall;
                $device->private_firewall = $private_firewall;
                $device->public_firewall = $public_firewall;
                $device->private_ip = $private_ip;
                $device->msoffice_version = $msoffice_version;
                $device->browsers = $browsers;
                $device->other = $other;
                $device->status = true;
                $device->save();

                HandleDeviceIP::dispatch($device);

                return response()->json(['device' => $device], 200);
            } else {
                abort(404);
            }
        }
    }

    public function ping(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|exists:watch_devices,id',
            'operating_system' => 'required',
            'machine_name' => 'required',
            'username' => 'required',
            'public_ip' => 'required',
            'device_encrypted' => 'required'
        ]);

        $device_id = $request->input('device_id');
        $operating_system = $request->input('operating_system');
        $machine_name = $request->input('machine_name');
        $username = $request->input('username');
        $public_ip = $request->input('public_ip');
        $device_encrypted = $request->input('device_encrypted');

        $user_domain_name = $request->input('user_domain_name');
        $system_directory = $request->input('system_directory');
        $antivirus_status = $request->input('antivirus_status');
        $windows_defender = $request->input('windows_defender');
        $anti_virus_apps = $request->input('anti_virus_apps');
        $domain_firewall = $request->input('domain_firewall');
        $private_firewall = $request->input('private_firewall');
        $public_firewall = $request->input('public_firewall');
        $private_ip = $request->input('private_ip');
        $msoffice_version = $request->input('msoffice_version');
        $browsers = $request->input('browsers');
        $other = $request->input('other');

        $device =  WatchDevice::find($device_id);

        if ($device) {
            $device->operating_system = $operating_system;
            $device->machine_name = $machine_name;
            $device->username = $username;
            $device->public_ip = $public_ip;
            $device->device_encrypted = $device_encrypted;
            $device->system_directory = $system_directory;
            $device->antivirus_status = $antivirus_status;
            $device->windows_defender = $windows_defender;
            $device->user_domain_name = $user_domain_name;
            $device->anti_virus_apps = $anti_virus_apps;
            $device->domain_firewall = $domain_firewall;
            $device->private_firewall = $private_firewall;
            $device->public_firewall = $public_firewall;
            $device->private_ip = $private_ip;
            $device->msoffice_version = $msoffice_version;
            $device->browsers = $browsers;
            $device->other = $other;
            $device->save();

            return response()->json(['device' => $device], 200);
        } else {
            abort(404);
        }
    }

    public function list(Request $request)
    {
        $user = $request->user();

        $devices = WatchDevice::where(['user_id' => $user->id, 'auto_created' => false])->get();

        return response()->json(['devices' => $devices], 200);
    }

    public function serviceStatus(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|exists:watch_devices,id',
            'status' => 'required',
            'date' => 'required',
        ]);

        $user = $request->user();
        $device_id = $request->input('device_id');
        $status = $request->input('status');
        $date = $request->input('date');

        WatchServiceStats::create([
            'device_id' => $device_id,
            'user_id' => $user->id,
            'status' => $status,
            'event_date' => Carbon::create($date)->toDateTimeString()
        ]);

        $status = ($status === 'Start' ? true : false);

        $device = WatchDevice::find($device_id);

        if ($device) {
            $device->status = $status;
            $device->save();
        }

        return response()->json(['message' => 'Success'], 200);
    }

    public function assignDevice(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|exists:watch_devices,id',
            'comp_id' => 'required|exists:companies,id',
        ]);

        $user = $request->user();

        $device_id = $request->input('device_id');
        $comp_id = $request->input('comp_id');

        $company_device = UserCompanyDevices::where([
            'user_id' => $user->id,
            'device_id' => $device_id,
            'comp_id' => $comp_id,
        ])->first();

        if (!$company_device) {
            UserCompanyDevices::create([
                'user_id' => $user->id,
                'device_id' => $device_id,
                'comp_id' => $comp_id,
            ]);
        }

        return response()->json(['message' => 'Success'], 200);
    }
}
