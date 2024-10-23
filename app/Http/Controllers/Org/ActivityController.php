<?php

namespace App\Http\Controllers\Org;

use App\Models\Activity;
use hisorange\BrowserDetect\Parser as Browser;
use App\Http\Controllers\Controller;
use App\Jobs\HandleDeviceIP;
use App\Jobs\UserTokenHandler;
use App\Models\AssetType;
use App\Models\Company;
use App\Models\CompanyLocation;
use App\Models\CompStandards;
use App\Models\ControlModel;
use App\Models\GlobalActivities;
use App\Models\MaturityLevel;
use App\Models\Project;
use App\Models\StdFamily;
use App\Models\StdFocus;
use App\Models\StdSatutes;
use App\Models\StdVersion;
use App\Models\Subject\FieldType;
use App\Models\Task;
use App\Models\Team;
use App\Models\UserCompanies;
use App\Models\UserCompanyDevices;
use App\Models\Watch\WatchDevice;
use App\Services\ValidValuesService;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    protected $validValuesService;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(ValidValuesService $validValuesService)
    {
        $this->middleware('auth:api');
        $this->validValuesService = $validValuesService;
    }

    public function list($id)
    {
        //TODO: needs to check wheter the user is allowed to view company activities or not

        if (!$id) {
            abort(404);
        }

        if (request()->get('search')) {
            $search = strtolower(trim(request()->get('search')));

            $activities = Activity::with('subject')->where(['comp_id' => $id])->latest()->paginate(10);
        } else {
            $activities = Activity::with('subject')->where(['comp_id' => $id])->latest()->paginate(10);
        }


        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        return $activities;
    }

    private function getStandards($comp_id)
    {
        return  CompStandards::select('comp_id', 'standard_id', 'priority')
        ->with(['standard' => function($q) {
            return $q
            ->with(['families.family', 'focuses.focus', 'statutes.satue']);
        }])
        ->join('standards', 'standards.id', '=', 'comp_standards.standard_id')
        ->where(['comp_standards.comp_id' => $comp_id])
        ->orderBy('standards.expand_name', 'asc')
        ->get();
    }

    public function record(Request $request)
    {
        $this->validate($request, ['comp_id' => 'required|exists:companies,id']);

        $comp_id = $request->input('comp_id');

        // TODO: needs to check wheter user has permision to login
        $user = $request->user();
        $user->companyLogins()->create([
            'comp_id' => $comp_id,
            'ip' => $request->ip(),
            'system' => $request->userAgent()
        ]);

        $user->globalActivities()->create([
            'comp_id' => $comp_id,
            'activity' => 'Login',
            'event_type' => 'login',
            'page' => 'Select company',
        ]);

        $company = Company::with('suppliers')->find($comp_id);

        $standards = $this->getStandards($comp_id);

        $control_models = ControlModel::select('id', 'name')->orderBy('name', 'asc')->get();
        $asset_types = AssetType::select('id', 'name')->orderBy('name', 'asc')->get();

        $maturity_level = MaturityLevel::select('id', 'name', 'value')->find($company->maturity_level);

        // $filtered_standards = [];
        // if (count($standards) > 0) {
        //     foreach ($standards as $std) {
        //         array_push($filtered_standards, $std->standard_id);
        //     }
        // }

        // $parent_sections = StandardSection::select('id', 'menu_name', 'abbreviation')->with('sections')->where(['parent' => null])
        //     ->whereIn('standard_id', $filtered_standards)
        //     ->get();

        $device_status = false;
        $new_location = false;

        if ($request->has('new_device') && $request->input('new_device') != null) {
            $new_device = $request->input('new_device');

            if (!UserCompanyDevices::where([
                'user_id' => $user->id,
                'comp_id' => $comp_id,
                'device_id' => $new_device['id'],
                'auto_created' => true
            ])->first()) {
                UserCompanyDevices::create([
                    'user_id' => $user->id,
                    'comp_id' => $comp_id,
                    'device_id' => $new_device['id'],
                    'auto_created' => true,
                    'nickname' => $user->first_name . "'s " . $new_device['operating_system']
                ]);
                $device_status = true;
                $new_location = false;
            } else {
                // check if is there any device exists with requested ip for user
                list($new_location, $device_status) = $this->detectLocation($user, $request->ip(), $comp_id);
            }
        } else {
            list($new_location, $device_status) = $this->detectLocation($user, $request->ip(), $comp_id);
        }

        $locations = CompanyLocation::where(['comp_id' => $comp_id])->orderby('name', 'asc')->get();

        if (UserCompanies::where(['comp_id' => $company->id, 'user_id' => $user->id, 'rete_sync' => 0])->first()) {

            UserTokenHandler::dispatch($user->id, $company->id);
        }

        $projects = Project::where([
            'comp_id' => $comp_id,
        ])
            ->latest()
            ->get();

        $tasks = Task::where([
            'comp_id' => $comp_id,
        ])
            ->latest()
            ->get();

        $field_types = FieldType::orderBy('sort_order', 'asc')->get();

        $users = UserCompanies::with('user', 'company')->where(['comp_id' => $comp_id])->get();

        $std_families = StdFamily::select('id', 'name')->orderBy('name', 'asc')->get();
        $std_versions = StdVersion::select('id', 'name')->orderBy('name', 'asc')->get();
        $std_focuses = StdFocus::select('id', 'name')->orderBy('name', 'asc')->get();
        $std_statutes = StdSatutes::select('id', 'name')->orderBy('name', 'asc')->get();

        $userSupplier = $user->suppliers()->first(); // needs to load corporate profile here 

        if (request()->wantsJson()) {
            return response()->json([
                'standards' => $standards,
                'control_models' => $control_models,
                'asset_types' => $asset_types,
                'maturity_level' => $maturity_level,
                'requested_ip' => $request->ip(),
                'device_status' => $device_status,
                'new_location' => $new_location,
                'locations' => $locations,
                'projects' => $projects,
                'tasks' => $tasks,
                'users' => $users,
                'field_types' => $field_types,
                'std_families' => $std_families,
                'std_versions' => $std_versions,
                'std_focuses' => $std_focuses,
                'std_statutes' => $std_statutes,
                'publishable_key' => config("services.stripe.key"),
                'policy_portal' => $company->policy_portal()->first(),
                'teams' => Team::where(['comp_id' => $comp_id])->get(),
                'states' => $this->validValuesService->states('asc'),
                'countries' => $this->validValuesService->countries('asc'),
                'naics_codes' => $this->validValuesService->naicsCodes(),
                'ethnicities' => $this->validValuesService->ethnicityList(),
                'compliant_reqs' => $this->validValuesService->compliantReqs(),
                'security_levels' => $this->validValuesService->securityLevels(),
                'suppliers_count' => count($company->suppliers),
                'company_suppliers' => $company->suppliers,
                'active_supplier' => ($userSupplier != null ? $userSupplier: $company->suppliers()->first())
            ], 200);
        }

        return [];
    }

    public function featchStandards($comp_id){
        return $this->getStandards($comp_id);
    }

    public function detectLocation($user, $ip, $comp_id)
    {
        // if the device is found but not attached to the company ?
        $device = WatchDevice::where(['user_id' => $user->id, 'auto_created' => true, 'public_ip' => $ip])->first();

        if ($device) {
            if (!UserCompanyDevices::where([
                'user_id' => $user->id,
                'comp_id' => $comp_id,
                'device_id' => $device->id,
                'auto_created' => true
            ])->first()) {
                UserCompanyDevices::create([
                    'user_id' => $user->id,
                    'comp_id' => $comp_id,
                    'device_id' => $device->id,
                    'auto_created' => true,
                    'nickname' => $user->first_name . "'s " . $device['operating_system']
                ]);

                return [false, true];
            } else {
                return [false, false];
            }
        } else {
            return [true, false];
        }
    }

    public function identifyAsset($request)
    {
        if (!Browser::isBot()) {
            $comp_id = $request->input('comp_id');
            $request_ip = $request->input('request_ip');
            $user = $request->user();
            $os = Browser::platformFamily();
            $os_major_version = Browser::platformVersionMajor();
            $os_minor_version = Browser::platformVersionMinor();
            $os_patch_version = Browser::platformVersionPatch();
            $browser = Browser::browserFamily();
            $browser_major_version = Browser::browserVersionMajor();
            $browser_minor_version = Browser::browserVersionMinor();
            $browser_patch_version = Browser::browserVersionPatch();

            $device = WatchDevice::where([
                'user_id' => $user->id,
                'public_ip' => $request_ip,
                'operating_system' => $os,
                'os_major_version' => $os_major_version,
                'os_minor_version' => $os_minor_version
            ])->first();

            if (!$device) {

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
                    'nickname' => $user->first_name . "'s " . $os
                ]);

                HandleDeviceIP::dispatch($device);

                return $device;
            } else {

                $device->public_ip = $request->ip();
                $device->browser_major_version = $browser_major_version;
                $device->browser_minor_version = $browser_minor_version;
                $device->browser_patch_version = $browser_patch_version;
                $device->save();

                if (!UserCompanyDevices::where(['user_id' => $user->id, 'comp_id' => $comp_id, 'device_id' => $device->id])->first()) {
                    UserCompanyDevices::create([
                        'user_id' => $user->id,
                        'comp_id' => $comp_id,
                        'device_id' => $device->id,
                        'auto_created' => true,
                        'nickname' => $user->first_name . "'s " . $os
                    ]);
                }

                HandleDeviceIP::dispatch($device);

                return $device;
            }
        }
    }

    public function allActivities($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $all_activities = GlobalActivities::where(['comp_id' => $comp_id])
            ->orderBy('event_type', 'asc')
            ->paginate(30);

        $all_activities = $all_activities->toArray();

        $collection = collect($all_activities['data']);

        $all_activities['data'] = $collection->groupBy('event_type');

        if (request()->wantsJson()) {
            return response()->json(['all_activities' => $all_activities], 200);
        }

        return $all_activities;
    }

    public function generaActivities($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $activities = GlobalActivities::with(['user'])
            ->where(['comp_id' => $comp_id])
            ->where(function ($query) {
                $query->where(['event_type' => 'general_settings'])
                    ->orWhere(['event_type' => 'logo_upload']);
            })
            ->paginate(10);

        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        return $activities;
    }

    public function locationActivities($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $activities = GlobalActivities::with(['user'])
            ->where(['comp_id' => $comp_id])
            ->where(function ($query) {
                $query->where(['event_type' => 'location_change'])
                    ->orWhere(['event_type' => 'location_create'])
                    ->orWhere(['event_type' => 'location_updated']);
            })
            ->paginate(10);

        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        return $activities;
    }

    public function documentActivities($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $activities = GlobalActivities::with(['user', 'document', 'standard', 'section', 'control'])
            ->where(['comp_id' => $comp_id, 'event_type' => 'document'])
            ->paginate(10);

        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        return $activities;
    }

    public function controlActivities($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $activities = GlobalActivities::with(['user', 'document', 'standard', 'section', 'control'])
            ->where(['comp_id' => $comp_id, 'event_type' => 'control'])
            ->paginate(10);

        if (request()->wantsJson()) {
            return response()->json(['activities' => $activities], 200);
        }

        return $activities;
    }
}
