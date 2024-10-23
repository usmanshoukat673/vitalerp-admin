<?php

namespace App\Http\Controllers;

use App\Jobs\HandleDeviceIP;
use App\Models\Watch\WatchDevice;
use Illuminate\Http\Request;
use hisorange\BrowserDetect\Parser as Browser;

/**
 * Fillter Response before sending it to API
 */
trait DeviceHandler
{
    public function identifyAsset(Request $request)
    {
        $device = '';
        if (!Browser::isBot()) {

            $user = $request->user();
            $os = Browser::platformFamily();
            $os_major_version = Browser::platformVersionMajor();
            $os_minor_version = Browser::platformVersionMinor();
            $os_patch_version = Browser::platformVersionPatch();
            $browser = Browser::browserFamily();
            $browser_major_version = Browser::browserVersionMajor();
            $browser_minor_version = Browser::browserVersionMinor();
            $browser_patch_version = Browser::browserVersionPatch();

            if (!WatchDevice::where(['user_id' => $user->id, 'auto_created' => true])->first()) {
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

                HandleDeviceIP::dispatch($device);
            }
        }

        return $device;
    }
}
