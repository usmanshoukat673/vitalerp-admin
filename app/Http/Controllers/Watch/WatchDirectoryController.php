<?php

namespace App\Http\Controllers\Watch;

use App\Http\Controllers\Controller;
use App\Jobs\HandleActivitiesRequest;
use App\Models\UserCompanyDevices;
use App\Models\Watch\ActivityRequests;
use App\Models\Watch\Directory;
use Illuminate\Http\Request;

class WatchDirectoryController extends Controller
{
    public function create(Request $request)
    {
        $this->validate($request, [
            'device_id' => 'required|exists:watch_devices,id',
            'comp_id' => 'required|exists:companies,id',
            'path' => 'required',
            'type' => 'required',
        ]);
        $user = $request->user();
        $device_id = $request->input('device_id');
        $comp_id = $request->input('comp_id');
        $path = $request->input('path');
        $type = $request->input('type');

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

        $directory = Directory::where([
            'device_id' => $device_id,
            'comp_id' => $comp_id,
            'user_id' => $user->id,
            'path' => $path,
            'type' => $type,
        ])->first();

        if (!$directory) {
            $directory =  Directory::create([
                'device_id' => $device_id,
                'comp_id' => $comp_id,
                'user_id' => $user->id,
                'path' => $path,
                'type' => $type,
            ]);
        }

        return response()->json(['directory' => $directory], 200);
    }

    public function storeActivity(Request $request)
    {
        $this->validate($request, [
            'activities' => 'required|file'
        ]);

        $extention = strtolower($request->file('activities')->getClientOriginalExtension());

        if ($extention !== 'json') {
            return response()->json(['errors' => [['activities' => 'The activities must be a file of type: json.']]], 422);
        }

        $user = $request->user();

        $name = $request->file('activities')->getClientOriginalName();

        $activity_file = ActivityRequests::create([
            'name' => $name,
            'size'       => $request->file('activities')->getSize(),
            'ext'        => $extention,
            'user_id' => $user->id,
        ]);

        $request->file('activities')->move(config('motion.WATCH_ACTIVITIES_FILES'), $activity_file->id . '.' . $activity_file->ext);

        $activity_file->path = config('motion.WATCH_ACTIVITIES_FILES') . $activity_file->id . '.' . $activity_file->ext;
        $activity_file->save();

        HandleActivitiesRequest::dispatch($activity_file);

        return response()->json(['message' => $activity_file->name . ' uploaded successfully!'], 200);
    }
}
