<?php

namespace App\Http\Controllers\Org;

use App\Http\Controllers\Controller;
use App\Models\CompanySection;
use App\Models\CompStandards;
use App\Models\CustodianSection;
use App\Models\CustodianTeamSection;
use App\Models\OwnerTeamSection;
use App\Models\StandardSection;
use App\Models\ThirdPartyCustodianSections;
use App\Models\ThirdPartyOwnerSections;
use App\Models\UserCompanies;
use App\Models\UserSection;
use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function users($id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$id) {
            abort(404);
        }

        $user = request()->user();

        $users = UserCompanies::with('user', 'company')->where(['comp_id' => $id])
            ->where('user_id', '!=', $user->id)
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['users' => $users], 200);
        }

        return $users;
    }

    public function sections($comp_id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$comp_id) {
            abort(404);
        }

        // get section with parent and child relation and also with childs
        $standards = $this->getCompanyStandards($comp_id);

        if (count($standards) > 0) {
            $parent_sections = StandardSection::select('standard_sections.id', 'menu_name', 'abbreviation', 'standard_id')
                ->with('sections')
                ->with('standard')
                ->where(['parent' => null])
                ->whereIn('standard_id', $standards)
                ->paginate(1);

            $parent_sections->getCollection()->transform(function ($section) use ($comp_id) {

                $authority = CompanySection::where(['comp_id' => $comp_id, 'section_id' => $section->id, 'standard_id' => $section->standard_id])->first();

                if ($authority->owner_authority == 'users') {
                    // get owners

                    $owners = UserSection::with(['user' => function ($q) {
                        $q->select('id', 'first_name', 'last_name');
                    }])->select('user_id')
                        ->where([
                            'comp_id' => $comp_id,
                            'section_id' => $section->id,
                            'standard_id' => $section->standard_id,
                            'enable' => 1
                        ])
                        ->distinct()->get();
                    $section->owners = $owners;
                    $section->owner_teams = [];
                    $section->owner_thirdparty = [];
                } elseif ($authority->owner_authority == 'teams') {
                    // get teams
                    $owner_teams = OwnerTeamSection::with(['team' => function ($q) {
                        $q->select('id', 'name');
                    }])
                        ->select('team_id')
                        ->where([
                            'comp_id' => $comp_id,
                            'section_id' => $section->id,
                            'standard_id' => $section->standard_id,
                            'enable' => 1
                        ])
                        ->distinct()->get();
                    $section->owner_teams = $owner_teams;
                    $section->owners = [];
                    $section->owner_thirdparty = [];
                } else {
                    // get third party
                    $owner_thirdparty = ThirdPartyOwnerSections::with(['thirdparty' => function ($q) {
                        $q->select('id', 'name');
                    }])
                        ->select('tp_id')
                        ->where([
                            'comp_id' => $comp_id,
                            'section_id' => $section->id,
                            'standard_id' => $section->standard_id,
                            'enable' => 1
                        ])
                        ->distinct()->get();
                    $section->owner_thirdparty = $owner_thirdparty;
                    $section->owners = [];
                    $section->owner_teams = [];
                }

                if ($authority->custodian_authority == 'users') {
                    // get custodians
                    $custodians = CustodianSection::with(['user' => function ($q) {
                        $q->select('id', 'first_name', 'last_name');
                    }])
                        ->select('user_id')
                        ->where([
                            'comp_id' => $comp_id,
                            'section_id' => $section->id,
                            'standard_id' => $section->standard_id,
                            'enable' => 1
                        ])->distinct()
                        ->get();
                    $section->custodians = $custodians;
                    $section->custodian_thirdparty = [];
                    $section->custodian_teams = [];
                } elseif ($authority->custodian_authority == 'teams') {
                    // get teams
                    $custodian_teams = CustodianTeamSection::with(['team' => function ($q) {
                        $q->select('id', 'name');
                    }])
                        ->select('team_id')
                        ->where([
                            'comp_id' => $comp_id,
                            'section_id' => $section->id,
                            'standard_id' => $section->standard_id,
                            'enable' => 1
                        ])
                        ->distinct()
                        ->get();
                    $section->custodian_teams = $custodian_teams;
                    $section->custodians = [];
                    $section->custodian_thirdparty = [];
                } else {
                    // get third party
                    $custodian_thirdparty = ThirdPartyCustodianSections::with(['thirdparty' => function ($q) {
                        $q->select('id', 'name');
                    }])
                        ->select('tp_id')
                        ->where([
                            'comp_id' => $comp_id,
                            'section_id' => $section->id,
                            'standard_id' => $section->standard_id,
                            'enable' => 1
                        ])
                        ->distinct()->get();
                    $section->custodian_thirdparty = $custodian_thirdparty;
                    $section->custodians = [];
                    $section->custodian_teams = [];
                }

                $section->authority = $authority;

                return $section;
            });

            if (request()->wantsJson()) {
                return response()->json([
                    'parent_sections' => $parent_sections,

                ], 200);
            }

            return $parent_sections;
        } else {
            return response()->json([
                'message' => ['Please request for the standards, your company is not having access to standards'],

            ], 201);
        }
    }

    public function getCompanyStandards($comp_id)
    {

        // TODO: only if use is admin or need to check the user roles
        $standards = CompStandards::select('comp_id', 'standard_id')->get();

        $standards = $standards->map(function ($standard) {
            return $standard->standard_id;
        });

        return $standards;
    }
}
