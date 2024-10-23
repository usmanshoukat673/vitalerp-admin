<?php

namespace App\Jobs;

use App\Models\Watch\DirectoryActivities;
use App\Models\Watch\WatchDevice;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\File;
use App\Models\Watch\WatchServiceStats;

class HandleActivitiesRequest implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $activity_file;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($activity_file)
    {
        $this->activity_file = $activity_file;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $activities = json_decode(File::get($this->activity_file->path), true);

        if (count($activities)) {
            foreach ($activities as $activity) {
                if ($activity['watchEventType'] === 'Activity') {

                    DirectoryActivities::create([
                        'directory_id' => $activity['directory_id'],
                        'event' => $activity['watchEvent'],
                        'type' => $activity['kind'],
                        'path' => $activity['path'],
                        'name' => $activity['name'],
                        'extention' => pathinfo($activity['name'], PATHINFO_EXTENSION),
                        'size' => $activity['size'],
                        'event_date' => Carbon::create($activity['event_date'])->toDateTimeString(),
                        'permissions' => $activity['permissions'],
                    ]);
                } else if ($activity['watchEventType'] === 'Service') {
                    $this->storeServiceStat($activity);
                }
            }
        }

        if (File::exists($this->activity_file->path)) {
            File::delete($this->activity_file->path);
            $this->activity_file->delete();
        }
    }

    public function storeServiceStat($activity)
    {
        WatchServiceStats::create([
            'device_id' => $activity['device_id'],
            'user_id' => $this->activity_file->user_id,
            'status' => $activity['watchEvent'],
            'event_date' => Carbon::create($activity['event_date'])->toDateTimeString()
        ]);

        $status = ($activity['watchEvent'] === 'Start' ? true : false);

        $device = WatchDevice::find($activity['device_id']);

        if ($device) {
            $device->status = $status;
            $device->save();
        }
    }
}
