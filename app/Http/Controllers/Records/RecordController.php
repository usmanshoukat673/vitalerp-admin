<?php

namespace App\Http\Controllers\Records;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Org\LocationsController;
use App\Http\Controllers\RelatedRecordController;
use App\Http\Controllers\TeamManagement;
use App\Http\Traits\AccountCreation;
use App\Models\CompanyLocation;
use App\Models\RecordLocation;
use App\Models\Records;
use App\Models\RecordTeam;
use App\Models\RecordUser;
use App\Models\RelatedRecords;
use App\Models\Team;
use App\Models\UserCompanies;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class RecordController extends Controller
{
    use AccountCreation;

    const MODULE_HARDWARE = 3;
    const MODULE_SOFTWARE = 4;
    const MODULE_CLOUDSERVICES = 5;
    const MODULE_DATASETS = 6;
    const MODULE_PROCESSES = 7;
    const MODULE_INFORMATION_SYSTEMS = 8;
    const MODULE_VENDORS = 9;
    const MODULE_SUPPLIERS = 10;
    const MODULE_RISKS = 11;
    const MODULE_POEM = 12;
    const MODULE_INCIDENTS = 20;
    const MODULE_CORRECTIVE_ACTIONS = 13;
    const MODULE_PROCESS_IMPROVEMENTS = 14;
    const MODULE_SERVICES = 1;
    const MODULE_PRODUCTS = 2;
    const MODULE_LEGAL_REQUIREMENTS = 15;
    const MODULE_REGULATORY_REQUIREMENTS = 16;
    const MODULE_CONTRACTUAL_REQUIREMENTS = 17;
    const MODULE_CERTIFICATIONS = 18;
    const MODULE_SCOPES = 19;
    const MODULE_AGENTS = 21;

    public function add(Request $request, LocationsController $locationController, TeamManagement $teamManagement, RelatedRecordController $relatedRecordController)
    {
        $this->validate($request, [
            'asset_id' => 'required',
            'module_id' => 'required',
            'action_type' => 'required'
        ]);

        $action_type = $request->input('action_type');

        $asset_id = $request->input('asset_id');
        $module_id = $request->input('module_id');
        $name = $request->input('name');
        $description = $request->input('description');
        $parent = $request->input('parent');
        $manufacturer = $request->input('manufacturer');
        $model_number = $request->input('model_number');
        $version = $request->input('version');
        $license_type = $request->input('license_type');
        $acquired_date = $request->input('acquired_date');
        $comp_id = $request->input('comp_id');
        $user = $request->user();

        $thirdparties = (array) $request->input('thirdparties');
        $add_vos = (bool) $request->input('add_vos');
        $vendor_or_supplier = $request->input('vendor_or_supplier');
        $add_vos_name = $request->input('add_vos_name');

        $primary_user_team = $request->input('primary_user_team');
        $add_primary_user_team = (bool) $request->input('add_primary_user_team');
        $primary_user_or_team = $request->input('primary_user_or_team');
        $primary_user_or_team_name = $request->input('primary_user_or_team_name');

        $resposinble_user_team = $request->input('resposinble_user_team');
        $add_responsible_user_team = (bool) $request->input('add_responsible_user_team');
        $responsible_user_or_team = $request->input('responsible_user_or_team');
        $responsible_user_or_team_name = $request->input('responsible_user_or_team_name');

        $hd_locations = (array) $request->input('hd_locations');
        $add_location = (bool) $request->input('add_location');
        $add_location_name = $request->input('add_location_name');

        $softwares = (array) $request->input('softwares');
        $add_software = (bool) $request->input('add_software');
        $add_software_name = $request->input('add_software_name');

        $infosysts = (array) $request->input('infosysts');
        $add_infosysts = (bool) $request->input('add_infosysts');
        $add_infosysts_name = $request->input('add_infosysts_name');

        $datasets = (array) $request->input('datasets');
        $add_datasets = (bool) $request->input('add_datasets');
        $add_datasets_name = $request->input('add_datasets_name');

        $record = new Records();

        if ($action_type == 'add') {
            $record = $this->createRecrod(
                $name,
                $module_id,
                $user->id,
                $parent,
                $asset_id,
                $description,
                $manufacturer,
                $model_number,
                true,
                $version,
                $license_type,
                $acquired_date
            );
        }

        if ($action_type == "configure") {
            $record = Records::find($request->input('existing_record_id'));
            $record->name = $name;
            $record->description = $description;
            $record->configured = true;
            $record->asset_id = $asset_id;
            $record->manufacturer = $manufacturer;
            $record->model_number = $model_number;
            $record->version = $version;
            $record->license_type = $license_type;
            $record->acquired_date = $acquired_date;
            $record->save();
        }

        if ($add_vos) {
            if ($add_vos_name != '') {
                $related_record = $this->createRecrod($add_vos_name, $vendor_or_supplier, $user->id, $record->id);
                $relatedRecordController->create($record->id, $related_record->id, 1, $asset_id, $module_id);
            }
        } else {
            if (count($thirdparties) > 0) {
                foreach ($thirdparties as $thirdparty) {
                    $relatedRecordController->create($record->id, $thirdparty, 1, $asset_id, $module_id);
                }
            }
        }

        if ($add_software) {
            if ($add_software_name != '') {
                $related_record = $this->createRecrod($add_software_name, self::MODULE_SOFTWARE, $user->id, $record->id);
                $relatedRecordController->create($record->id, $related_record->id, 5, $asset_id, $module_id);
            }
        } else {
            if (count($softwares) > 0) {
                foreach ($softwares as $soft) {
                    $relatedRecordController->create($record->id, $soft, 5, $asset_id, $module_id);
                }
            }
        }

        if ($add_infosysts) {
            if ($add_infosysts_name != '') {
                $related_record = $this->createRecrod($add_infosysts_name, self::MODULE_INFORMATION_SYSTEMS, $user->id, $record->id);
                $relatedRecordController->create($record->id, $related_record->id, 6, $asset_id, $module_id);
            }
        } else {
            if (count($infosysts) > 0) {
                foreach ($infosysts as $sys) {
                    $relatedRecordController->create($record->id, $sys, 6, $asset_id, $module_id);
                }
            }
        }

        if ($add_datasets) {
            if ($add_datasets_name != '') {
                $related_record = $this->createRecrod($add_datasets_name, self::MODULE_DATASETS, $user->id, $record->id);
                $relatedRecordController->create($record->id, $related_record->id, 7, $asset_id, $module_id);
            }
        } else {
            if (count($datasets) > 0) {
                foreach ($datasets as $dataset) {
                    $relatedRecordController->create($record->id, $dataset, 7, $asset_id, $module_id);
                }
            }
        }

        // 2 - Who Is the Primary User or Department for This Asset?
        /**
         * Add User or Team 
         * Assign User or Team 
         * If team is already exists then just assign 
         */
        $QUESTION_ID = 2;
        if ($add_primary_user_team) {
            if ($primary_user_or_team_name != '' && $primary_user_or_team == 'team') {
                $this->createAndAssignTeam($teamManagement, $primary_user_or_team_name, $record->id, $QUESTION_ID, $asset_id, $module_id);
            } elseif ($primary_user_or_team_name != '' && $primary_user_or_team == 'user') {
                // create empty user 
                $user = $this->createAndAssignUser($primary_user_or_team_name, $record->id, $QUESTION_ID, $asset_id, $module_id);
            }
        } else {
            $primary_user_team = explode("_", $primary_user_team);

            if ($primary_user_team[0] == "user") {
                $this->createdRelatedUser($record->id, $primary_user_team[1], $QUESTION_ID, $asset_id, $module_id);
            }

            if ($primary_user_team[0] == "team") {
                $this->createdRelatedTeam($record->id, $primary_user_team[1], $QUESTION_ID, $asset_id, $module_id);
            }
        }

        // 3 - Who is the User/Department responsible for managing this Asset?
        /**
         * Add User or Team 
         * Assign User or Team 
         * If team is already exists then just assign 
         */
        $QUESTION_ID = 3;
        if ($add_responsible_user_team) {
            if ($responsible_user_or_team_name != '' && $responsible_user_or_team == 'team') {
                $this->createAndAssignTeam($teamManagement, $responsible_user_or_team_name, $record->id, $QUESTION_ID, $asset_id, $module_id);
            } else {
                // create empty user 
                $user = $this->createAndAssignUser($primary_user_or_team_name, $record->id, $QUESTION_ID, $asset_id, $module_id);
            }
        } else {
            $resposinble_user_team = explode("_", $resposinble_user_team);

            if ($resposinble_user_team[0] == "user") {
                $this->createdRelatedUser($record->id, $resposinble_user_team[1], $QUESTION_ID, $asset_id, $module_id);
            }

            if ($resposinble_user_team[0] == "team") {
                $this->createdRelatedTeam($record->id, $resposinble_user_team[1], $QUESTION_ID, $asset_id, $module_id);
            }
        }

        if ($add_location) {
            if ($add_location_name != '') {
                $location_request = new Request();

                $location_request->merge([
                    'comp_id' => $comp_id,
                    'name' => $add_location_name,
                ]);

                $location = new CompanyLocation();

                $location = ($locationController->addLocation($location_request))->getData();

                if (property_exists($location, 'errors') && count($location->errors) > 0) {
                    $location = $locationController->hasNameTaken($location_request);
                } else {
                    $location = $location->location;
                }

                $this->createdRelatedLocation($record->id, $location->id, 4, $asset_id, $module_id);
            }
        } else {
            if (count($hd_locations) > 0) {
                foreach ($hd_locations as $location_id) {
                    $this->createdRelatedLocation($record->id, $location_id, 4, $asset_id, $module_id);
                }
            }
        }

        $record = Records::with('createdby')->find($record->id);

        return response()->json([
            'record' => $record,
            'locations' => $locationController->getAllLocations($comp_id),
            'users' => UserCompanies::with('user', 'company')->where(['comp_id' => $comp_id])->get(),
            'teams' => Team::where(['comp_id' => $comp_id])->get()
        ]);
    }

    public function addRelated(Request $request, RelatedRecordController $relatedRecordController)
    {
        $this->validate($request, [
            'parent' => 'required',
            'module_id' => 'required',
        ]);

        $module_id = $request->input('module_id');
        $parent = $request->input('parent');
        $question_id = $request->input('question_id');
        $comp_id = $request->input('comp_id');
        $user = $request->user();

        $selected_records = (array) $request->input('selected_records');
        $add_record = (bool) $request->input('add_record');
        $add_record_name = $request->input('add_record_name');

        $record = Records::select('id', 'asset_id')->find($parent);

        if (!$record) return abort(404);

        if ($add_record) {
            if ($add_record_name != '') {
                $related_record = $this->createRecrod($add_record_name, $module_id, $user->id, $record->id);
                $relatedRecordController->create($record->id, $related_record->id, $question_id, $record->asset_id, $module_id);
            }
        } else {
            if (count($selected_records) > 0) {
                foreach ($selected_records as $related_record) {
                    $relatedRecordController->create($record->id, $related_record, 1, $record->asset_id, $module_id);
                }
            }
        }

        return response()->json([
            'relatedrecords' => $relatedRecordController->relatedRecords($record->id)
        ]);
    }

    public function addLocation(Request $request, LocationsController $locationController)
    {
        $this->validate($request, [
            'parent' => 'required',
            'module_id' => 'required',
        ]);

        $module_id = $request->input('module_id');
        $parent = $request->input('parent');
        $question_id = $request->input('question_id');
        $comp_id = $request->input('comp_id');

        $selected_locations = (array) $request->input('selected_locations');
        $add_location = (bool) $request->input('add_location');
        $add_location_name = $request->input('add_location_name');

        $record = Records::select('id', 'asset_id')->find($parent);

        if (!$record) return abort(404);

        if ($add_location) {
            if ($add_location_name != '') {
                $location_request = new Request();

                $location_request->merge([
                    'comp_id' => $comp_id,
                    'name' => $add_location_name,
                ]);

                $location = new CompanyLocation();

                $location = ($locationController->addLocation($location_request))->getData();

                if (property_exists($location, 'errors') && count($location->errors) > 0) {
                    $location = $locationController->hasNameTaken($location_request);
                } else {
                    $location = $location->location;
                }

                $this->createdRelatedLocation($record->id, $location->id, $question_id, $record->asset_id, $module_id);
            }
        } else {
            if (count($selected_locations) > 0) {
                foreach ($selected_locations as $location_id) {
                    $this->createdRelatedLocation($record->id, $location_id, $question_id, $record->asset_id, $module_id);
                }
            }
        }

        return response()->json([
            'locations' => RecordLocation::with('location')->where(['record_id' => $record->id])->get()
        ]);
    }

    public function addUsers(Request $request)
    {
        $this->validate($request, [
            'parent' => 'required',
            'module_id' => 'required',
        ]);

        $module_id = $request->input('module_id');
        $parent = $request->input('parent');
        $question_id = $request->input('question_id');
        $comp_id = $request->input('comp_id');

        $selected_users = (array) $request->input('selected_users');
        $add_user = (bool) $request->input('add_user');
        $add_user_name = $request->input('add_user_name');

        $record = Records::select('id', 'asset_id')->find($parent);
        if (!$record) return abort(404);
        if ($add_user) {
            if ($add_user_name != '') {
                $this->createAndAssignUser($add_user_name, $record->id, $question_id, $record->asset_id, $module_id);
            }
        } else {
            if (count($selected_users) > 0) {
                foreach ($selected_users as $selected_user_id) {
                    $this->createdRelatedUser($record->id, $selected_user_id, $question_id, $record->asset_id, $module_id);
                }
            }
        }
        return response()->json([
            'record_users' => RecordUser::with('user')->where(['record_id' => $record->id])->get(),
            'users' => UserCompanies::with('user', 'company')->where(['comp_id' => $comp_id])->get()
        ]);
    }

    public function addTeams(Request $request, TeamManagement $teamManagement)
    {
        $this->validate($request, [
            'parent' => 'required',
            'module_id' => 'required',
        ]);

        $module_id = $request->input('module_id');
        $parent = $request->input('parent');
        $question_id = $request->input('question_id');
        $comp_id = $request->input('comp_id');

        $selected_teams = (array) $request->input('selected_teams');
        $add_team = (bool) $request->input('add_team');
        $add_team_name = $request->input('add_team_name');

        $record = Records::select('id', 'asset_id')->find($parent);
        if (!$record) return abort(404);
        if ($add_team) {
            if ($add_team_name != '') {
                $this->createAndAssignTeam($teamManagement, $add_team_name, $record->id, $question_id, $record->asset_id, $module_id);
            }
        } else {
            if (count($selected_teams) > 0) {
                foreach ($selected_teams as $selected_team_id) {
                    $this->createdRelatedTeam($record->id, $selected_team_id, $question_id, $record->asset_id, $module_id);
                }
            }
        }
        return response()->json([
            'record_teams' => RecordTeam::with('team')->where(['record_id' => $record->id])->get(),
            'teams' => Team::where(['comp_id' => $comp_id])->get()
        ]);
    }

    private function createdRelatedLocation($record_id, $location_id, $question_id, $asset_id, $module_id)
    {
        if (!RecordLocation::where([
            'record_id' => $record_id,
            'location_id' => $location_id,
            'question_id' => $question_id,
            'asset_id' => $asset_id,
            'module_id' => $module_id,
        ])->first()) {
            RecordLocation::create([
                'record_id' => $record_id,
                'location_id' => $location_id,
                'question_id' => $question_id,
                'asset_id' => $asset_id,
                'module_id' => $module_id,
            ]);
        }
    }

    private function createdRelatedTeam($record_id, $team_id, $question_id, $asset_id, $module_id)
    {
        if (!RecordTeam::where([
            'record_id' => $record_id,
            'team_id' => $team_id,
            'question_id' => $question_id,
            'asset_id' => $asset_id,
            'module_id' => $module_id,
        ])->first()) {
            RecordTeam::create([
                'record_id' => $record_id,
                'team_id' => $team_id,
                'question_id' => $question_id,
                'asset_id' => $asset_id,
                'module_id' => $module_id,
            ]);
        }
    }

    private function createdRelatedUser($record_id, $user_id, $question_id, $asset_id, $module_id)
    {
        if (!RecordUser::where([
            'record_id' => $record_id,
            'user_id' => $user_id,
            'question_id' => $question_id,
            'asset_id' => $asset_id,
            'module_id' => $module_id,
        ])->first()) {
            RecordUser::create([
                'record_id' => $record_id,
                'user_id' => $user_id,
                'question_id' => $question_id,
                'asset_id' => $asset_id,
                'module_id' => $module_id,
            ]);
        }
    }

    private function createRecrod(
        $name,
        $module_id,
        $created_by,
        $parent = null,
        $asset_id = null,
        $description = null,
        $manufacturer = null,
        $model_number = null,
        $configured = false,
        $version = '',
        $license_type = '',
        $acquired_date = ''
    ) {
        return Records::create([
            'name' => $name,
            'description' => $description,
            'parent' => $parent,
            'asset_id' => $asset_id,
            'module_id' => $module_id,
            'manufacturer' => $manufacturer,
            'model_number' => $model_number,
            'comp_id' => request()->input('comp_id'),
            'created_by' => $created_by,
            'configured' => $configured,
            'version' => $version,
            'license_type' => $license_type,
            'acquired_date' => $acquired_date
        ]);
    }

    private function createAndAssignTeam($teamManagement, $name, $record_id, $question_id, $asset_id, $module_id)
    {
        $team_request = new Request();

        $team_request->merge([
            'comp_id' => request()->input('comp_id'),
            'name' => $name,
        ]);

        $team = new Team();

        $team = ($teamManagement->createTeam($team_request))->getData();

        if (property_exists($team, 'errors') && count($team->errors) > 0) {
            $team = $teamManagement->hasNameTaken($team_request);
        } else {
            $team = $team->team;
        }

        $this->createdRelatedTeam($record_id, $team->id, $question_id, $asset_id, $module_id);

        return $team;
    }

    private function createAndAssignUser($name, $record_id, $question_id, $asset_id, $module_id)
    {
        $name = explode(" ", $name);

        $last_name = '[Not Set]';

        if (count($name) >= 2) {
            $last_name = $name[1];
        }

        $user = $this->createEmptyUser([
            'first_name' => $name[0],
            'last_name' => ($last_name == '' ? '[Not Set]' : $last_name),
            'email' => '[Not Set]',
            'comp_id' => request()->input('comp_id'),
            'assigned_by' => request()->user()->id
        ]);

        $this->createdRelatedUser($record_id, $user->id, $question_id, $asset_id, $module_id);

        return $user;
    }

    public function index()
    {
        $comp_id = request()->input('comp_id');

        $records = Records::where(['comp_id' => $comp_id])->get();

        return response()->json([
            'records' => $records
        ]);
    }

    public function getAssetRecords($asset_id, $module_id)
    {
        $comp_id = request()->input('comp_id');

        $records = Records::with(['related_records.relatedrecord', 'teams.team', 'users', 'locations.location' => function ($q) {
            return $q->select(['comp_id', 'id', 'name']);
        }])
            ->where(['comp_id' => $comp_id, 'asset_id' => $asset_id, 'module_id' => $module_id])
            ->get();

        return response()->json([
            'records' => $records
        ]);
    }

    public function details($record_id, RelatedRecordController $relatedRecordController)
    {
        return response()->json([
            'relatedrecords' => $relatedRecordController->relatedRecords($record_id),
            'teams' => RecordTeam::with('team')->where(['record_id' => $record_id])->get(),
            'users' => RecordUser::with('user')->where(['record_id' => $record_id])->get(),
            'locations' =>  RecordLocation::with('location')->where(['record_id' => $record_id])->get()
        ]);
    }

    public function delete(Request $request)
    {
        $this->validate($request, [
            'record_id' => 'required|exists:records,id',
        ]);

        $record_id = $request->input('record_id');

        return Records::find($record_id)->delete();
    }
}
