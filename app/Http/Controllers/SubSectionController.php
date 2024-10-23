<?php

namespace App\Http\Controllers;

use App\Models\CompanySection;
use App\Models\CompCtrlDocs;
use App\Models\CompCtrls;
use App\Models\CompStandards;
use App\Models\CustodianSection;
use App\Models\CustodianTeamSection;
use App\Models\GlobalActivities;
use App\Models\OwnerTeamSection;
use App\Models\ThirdPartyCustodianSections;
use App\Models\ThirdPartyOwnerSections;
use App\Models\UserSection;
use App\Models\UserSectionLike;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class SubSectionController extends Controller
{
    public function domainInfo(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
            'sections' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $sections = (array) $request->input('sections');

        $assigned_standards = CompStandards::where([
            'comp_id' => $comp_id,
        ])->pluck('standard_id')->toArray();

        $company_standard = CompStandards::where([
            'comp_id' => $comp_id,
            'standard_id' => $standard_id
        ])->first();

        $domain_controls = CompCtrls::with(['control' => function ($q) use ($assigned_standards) {
            return $q->select('id', 'number', 'name', 'baseline_privacy', 'maturity_level')
                ->with(['mapped.control' => function ($q) use ($assigned_standards) {
                    return $q->select('id', 'standard_section_id', 'standard_id')
                        ->with(['standard' => function ($q) {
                            $q->select('id');
                        }])
                        ->whereIn('standard_id', $assigned_standards);
                }])
                ->with('baseline_priorities');
        }])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])

            ->whereIn('section_id', $sections)
            ->get();

        $domain_controls = $this->filterControlsBaseonPriority($domain_controls, $company_standard);

        $mapped_to_control_ids = $this->getMappedToIdsFromDomainControls($domain_controls);

        $control_mappings =  $this->getMappedControls($mapped_to_control_ids, $comp_id);

        $domain_documents = CompCtrlDocs::with('document.docowner')
            ->with(['control' => function ($q) {
                return $q->select('id', 'number');
            }])
            ->where([
                'comp_id' => $comp_id,
                // 'standard_id' => $standard_id
            ])
            ->where(function($query) use ($sections, $mapped_to_control_ids) {
                $query->whereIn('section_id', $sections)
                ->orWhereIn('control_id',  $mapped_to_control_ids);
            })
            ->get();

        $domain_documents = $this->groupDocuments($domain_documents);

        list($applicable, $not_applicable, $partially_imple, $implemented, $excluded_ctrls) = $this->getDomainChartInfo($comp_id, $standard_id, $sections);

        return response([
            'domain_info' => [
                'control_count' => count($domain_controls),
                'documents_count' => count($domain_documents),
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'excluded_ctrls' => $excluded_ctrls
            ],
            'domain_documents' => $domain_documents,
            'domain_controls' => $domain_controls,
            'control_mappings' => $control_mappings,
            'domain_activities' => $request->user()->globalActivities()
                ->with(['user', 'control', 'section', 'document'])
                ->where(['comp_id' => $comp_id, 'standard_id' => $standard_id])
                ->whereIn('section_id', $sections)
                ->latest()
                ->get()
        ], 200);
    }

    public function controlApplicability(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
            'company_control_id' => 'required',
            'sections' => 'required',
            'applicability' => 'required'
        ]);

        $comp_id = (int) $request->input('comp_id');
        $standard_id = (int) $request->input('standard_id');
        $sections = (array) $request->input('sections');
        $company_control_id = (int) $request->input('company_control_id');
        $applicability = (string) $request->input('applicability');

        CompCtrls::where([
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'id' => $company_control_id
        ])
            ->update([
                'applicable' => $applicability
            ]);

        $comp_ctr_prop = CompCtrls::select('standard_id', 'section_id', 'control_id')->find($company_control_id);

        GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => request()->user()->id,
            'activity' => 'Applicability',
            'event_type' => 'control',
            'ctrl_applicability' => $applicability,
            'standard_id' => $comp_ctr_prop->standard_id,
            'section_id' => $comp_ctr_prop->section_id,
            'control_id' => $comp_ctr_prop->control_id,
            'page' => 'Compliance',
        ]);

        return $this->controlInfo($comp_id, $standard_id, $sections);
    }

    public function controlMaturityLevel(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
            'company_control_id' => 'required',
            'maturity_level' => 'required'
        ]);

        $comp_id = (int) $request->input('comp_id');
        $standard_id = (int) $request->input('standard_id');
        $company_control_id = (int) $request->input('company_control_id');
        $maturity_level = (string) $request->input('maturity_level');

        CompCtrls::where([
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'id' => $company_control_id
        ])
            ->update([
                'maturity_level' => $maturity_level
            ]);

        $comp_ctr_prop = CompCtrls::select('standard_id', 'section_id', 'control_id')->find($company_control_id);

        return response(['message' => "Success"], 200);
    }

    public function controlStatus(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
            'company_control_id' => 'required',
            'sections' => 'required',
            'control_status' => 'required'
        ]);

        $comp_id = (int) $request->input('comp_id');
        $standard_id = (int) $request->input('standard_id');
        $sections = (array) $request->input('sections');
        $company_control_id = (int) $request->input('company_control_id');
        $control_status = (string) $request->input('control_status');

        CompCtrls::where([
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'id' => $company_control_id
        ])
            ->update([
                'status' => $control_status
            ]);

        $comp_ctr_prop = CompCtrls::select('standard_id', 'section_id', 'control_id')->find($company_control_id);

        GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => request()->user()->id,
            'activity' => 'Status',
            'event_type' => 'control',
            'ctrl_status' => $control_status,
            'standard_id' => $comp_ctr_prop->standard_id,
            'section_id' => $comp_ctr_prop->section_id,
            'control_id' => $comp_ctr_prop->control_id,
            'page' => 'Compliance',
        ]);

        return $this->controlInfo($comp_id, $standard_id, $sections);
    }

    /**
     * A function that retrieves control information based on company id, standard id, and sections.
     *
     * @param datatype $comp_id description
     * @param datatype $standard_id description
     * @param datatype $sections description
     * @return Some_Return_Value
     */
    private function controlInfo($comp_id, $standard_id, $sections)
    {
        list($applicable, $not_applicable, $partially_imple, $implemented, $excluded_ctrls) = $this->getDomainChartInfo($comp_id, $standard_id, $sections);

        return response([
            'domain_info' => [
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'excluded_ctrls' => $excluded_ctrls
            ],
        ], 200);
    }

    public function subSectionInfo(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standard_id' => 'required',
            'sections' => 'required',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $sections = $request->input('sections');

        $activities = $user->globalActivities()
            ->with(['user', 'control', 'section', 'document'])
            ->where(['comp_id' => $comp_id, 'standard_id' => $standard_id])
            ->whereIn('section_id', $sections)
            ->latest()
            ->limit(10)
            ->get();

        // get controls statuts
        list($applicable, $not_applicable, $partially_imple, $implemented, $excluded_ctrls) = $this->getDomainChartInfo($comp_id, $standard_id, $sections);

        $like = UserSectionLike::where(['comp_id' => $comp_id, 'section_id' => $sections[0], 'standard_id' => $standard_id, 'user_id' => $user->id])->first();

        // The resposibilities inforation
        $authority = CompanySection::where(['comp_id' => $comp_id, 'section_id' => $sections[0], 'standard_id' => $standard_id])->first();

        $owners = [];
        $owner_teams = [];
        $owner_thirdparty = [];

        $custodians = [];
        $custodian_teams = [];
        $custodian_thirdparty = [];


        if ($authority->owner_authority == 'users') {
            // get owners
            $owners = UserSection::with(['user' => function ($q) {
                $q->select('id', 'first_name', 'last_name');
            }])->select('user_id')
                ->where([
                    'comp_id' => $comp_id,
                    'section_id' => $sections[0],
                    'standard_id' => $standard_id,
                    'enable' => 1
                ])
                ->distinct()->get();
            $owners = $owners;
            $owner_teams = [];
            $owner_thirdparty = [];
        } elseif ($authority->owner_authority == 'teams') {
            // get teams
            $owner_teams = OwnerTeamSection::with(['team' => function ($q) {
                $q->select('id', 'name');
            }])
                ->select('team_id')
                ->where([
                    'comp_id' => $comp_id,
                    'section_id' => $sections[0],
                    'standard_id' => $standard_id,
                    'enable' => 1
                ])
                ->distinct()->get();
            $owner_teams = $owner_teams;
            $owner_thirdparty = [];
            $owners = [];
        } else {
            // get teams
            $owner_thirdparty = ThirdPartyOwnerSections::with(['thirdparty' => function ($q) {
                $q->select('id', 'name');
            }])
                ->select('tp_id')
                ->where([
                    'comp_id' => $comp_id,
                    'section_id' => $sections[0],
                    'standard_id' => $standard_id,
                    'enable' => 1
                ])
                ->distinct()->get();
            $owner_thirdparty = $owner_thirdparty;
            $owners = [];
            $owner_teams = [];
        }

        if ($authority->custodian_authority == 'users') {
            // get custodians
            $custodians = CustodianSection::with(['user' => function ($q) {
                $q->select('id', 'first_name', 'last_name');
            }])
                ->select('user_id')
                ->where([
                    'comp_id' => $comp_id,
                    'section_id' => $sections[0],
                    'standard_id' => $standard_id,
                    'enable' => 1
                ])->distinct()
                ->get();
            $custodians = $custodians;
            $custodian_thirdparty = [];
            $custodian_teams = [];
        } elseif ($authority->custodian_authority == 'teams') {
            // get teams
            $custodian_teams = CustodianTeamSection::with(['team' => function ($q) {
                $q->select('id', 'name');
            }])
                ->select('team_id')
                ->where([
                    'comp_id' => $comp_id,
                    'section_id' => $sections[0],
                    'standard_id' => $standard_id,
                    'enable' => 1
                ])
                ->distinct()
                ->get();
            $custodian_teams = $custodian_teams;
            $custodians = [];
            $custodian_thirdparty = [];
        } else {
            // get teams
            $custodian_thirdparty = ThirdPartyCustodianSections::with(['thirdparty' => function ($q) {
                $q->select('id', 'name');
            }])
                ->select('tp_id')
                ->where([
                    'comp_id' => $comp_id,
                    'section_id' => $sections[0],
                    'standard_id' => $standard_id,
                    'enable' => 1
                ])
                ->distinct()
                ->get();
            $custodian_thirdparty = $custodian_thirdparty;
            $custodian_teams = [];
            $custodians = [];
        }

        if ($request->wantsJson()) {
            return response()->json([
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'excluded_ctrls' => $excluded_ctrls,
                'activities' => $activities,
                'authority' => $authority,
                'owners' => $owners,
                'owner_teams' => $owner_teams,
                'custodians' => $custodians,
                'custodian_teams' => $custodian_teams,
                'owner_thirdparty' => $owner_thirdparty,
                'custodian_thirdparty' => $custodian_thirdparty,
                'like' => $like,
            ], 200);
        }
    }

    private function getDomainChartInfo(int $comp_id, int $standard_id, array $sections)
    {
        $applicable = CompCtrls::where(['applicable' => 'Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->count();


        $not_applicable = CompCtrls::where(['applicable' => 'Not Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->count();

        $partially_imple = CompCtrls::where(['status' => 'Partially Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->count();

        $implemented = CompCtrls::where(['status' => 'Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->count();

        $excluded = CompCtrls::where(['applicable' => 'Excluded'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->count();

        return [$applicable, $not_applicable, $partially_imple, $implemented, $excluded];
    }
}
