<?php

namespace App\Jobs;

use App\Models\Watch\DeviceLocations;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class HandleDeviceIP implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $device;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($device)
    {
        $this->device = $device;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->device->public_ip != null && $this->device->public_ip !== $this->device->last_request_ip && $this->device->public_ip !== '127.0.0.1') {
            $ip_details = json_decode(file_get_contents("https://ipinfo.io/" . $this->device->public_ip . "/json?token=" . config('motion.IPINFO_TOKEN')));

            $lat_log = explode(',', $ip_details->loc);

            if (count($lat_log) == 2) {
                $this->device->ip_hostname = $ip_details->org;
                $this->device->latitude = $lat_log[0];
                $this->device->longitude = $lat_log[1];
                $this->device->city = $ip_details->city;
                $this->device->country = $ip_details->country;
                $this->device->postalcode = $ip_details->postal;
                $this->device->timezone = $ip_details->timezone;
                $this->device->region = $ip_details->region;
                $this->device->ip_org = $ip_details->org;
                $this->device->last_request_ip = $this->device->public_ip;
                $this->device->save();

                DeviceLocations::create([
                    'device_id' => $this->device->id,
                    'ip_hostname' => $ip_details->org,
                    'latitude' => $lat_log[0],
                    'longitude' => $lat_log[1],
                    'city' => $ip_details->city,
                    'country' => $ip_details->country,
                    'postalcode' => $ip_details->postal,
                    'timezone' => $ip_details->timezone,
                    'region' => $ip_details->region,
                    'ip_org' => $ip_details->org,
                    'request_ip' => $this->device->public_ip,
                ]);
            }
        }
    }
}
