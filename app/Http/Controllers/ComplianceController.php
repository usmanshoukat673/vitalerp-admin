<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Http\Traits\DocumentsHelper;
use App\Http\Traits\StandardInformation;
use App\Models\Application;
use App\Models\Company;
use App\Models\CompanySection;
use App\Models\CompCtrlDocs;
use App\Models\CompCtrls;
use App\Models\CompStandards;
use App\Models\CompStdDocs;
use App\Models\CustodianSection;
use App\Models\CustodianTeamSection;
use App\Models\FileManager\Document;
use App\Models\OwnerTeamSection;
use App\Models\QuensAssets;
use App\Models\Questionaire;
use App\Models\QuestionControls;
use App\Models\SectionControl;
use App\Models\SectionDocuments;
use App\Models\Standard;
use App\Models\StandardSection;
use App\Models\TaskControls;
use App\Models\ThirdPartyCustodianSections;
use App\Models\ThirdPartyOwnerSections;
use App\Models\UserSection;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ComplianceController extends Controller
{
    private $control_documents, $activities;

    use CompanyCommons, DocumentsHelper, StandardInformation;

    public function __construct()
    {
        $this->control_documents = new Collection();
        $this->activities = new Collection();
    }

    public function controls(Request $request)
    {
        $this->validate($request, [
            'section_id' => 'required',
            'comp_id' => 'required',
            'standard' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $maturity_levels = $request->input('maturity_levels');
        $maturity_level = $request->input('maturity_level');
        $control_models = $request->input('control_models');
        $asset_types = $request->input('asset_types');
        $standard = $request->input('standard');

        $controls = SectionControl::with([
            'maturityLevel',
            'ctlfunction',
            'models',
            'assets',
            'assessment_question.question',
            'tags.tag',
            'properties',
            'artifacts.document',
            'tasks.task',
        ])
            ->whereHas('section', function ($query) use ($standard) {
                $query->where(['standard_id' => $standard['standard_id']]);
            })
            ->with(['mapped.control.standard' => function ($query) {
                $query->select('id', 'name');
            }])
            ->with(['mapped.control' => function ($query) {
                $query->select('id', 'name', 'number', 'standard_id');
            }])
            ->where([
                'standard_section_id' => $request->input('section_id'),
            ]);

        // if ($standard['standard']['models']) {
        //     if (count($control_models) > 0) {
        //         $controls->whereHas('models', function ($query) use ($control_models) {
        //             $query->whereIn('model_id', $control_models);
        //         });
        //     }
        // }

        // if ($standard['standard']['assets']) {
        //     if (count($asset_types) > 0) {
        //         $controls->whereHas('assets', function ($query) use ($asset_types) {
        //             $query->whereIn('asset_id', $asset_types);
        //         });
        //     }
        // }

        // if ($standard['standard']['maturity_levels']) {
        //     if (count($maturity_levels) > 0) {
        //         $controls->whereIn('maturity_level', $maturity_levels);
        //     }
        // }

        // ->with(['models' => function ($query) use ($control_models) {
        //     $query->whereIn('model_id', $control_models);
        // }])
        // ->with(['assets' => function ($query) use ($asset_types) {
        //     $query->whereIn('asset_id', $asset_types);
        // }])

        Company::where(['id' => $comp_id])
            ->update(['maturity_level' => $maturity_level]);

        $controls = $controls->paginate(20);

        $docs_count = CompCtrlDocs::select('id', 'comp_id')
            ->where(['comp_id' => $comp_id, 'section_id' => $request->input('section_id'), 'standard_id' => $standard['standard_id']])
            ->count();

        if ($request->wantsJson()) {
            return response()->json(['controls' => $controls, 'docs_count' => (int)$docs_count], 200);
        }
    }

    public function standardInfo(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standard_id' => 'required',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $getdocs = $request->input('getdocs');

        $docs_collection = new Collection();

        if ($getdocs) {
            $this->control_documents = CompCtrlDocs::select('id', 'comp_id', 'document_id', 'control_id', 'section_id', 'standard_id', 'updated_by', 'created_at', 'updated_at')
                ->with(['control' => function ($query) {
                    $query->select('id', 'name', 'number', 'short_name');
                }])
                ->with(['document.controls.control' => function ($query) {
                    $query->select('id', 'number');
                }])
                ->with(['document' => function ($query) {
                    $query->select('id', 'name', 'ext', 'modified', 'updated_at', 'type');
                }])
                ->where([
                    'comp_id' => $comp_id,
                    'standard_id' => $standard_id
                ])
                ->get();

            $docs_collection = $this->getUniqueDocuments($docs_collection);
        }


        $this->activities = $user->globalActivities()
            ->with(['user', 'control', 'section', 'document'])
            ->where(['comp_id' => $comp_id])->latest()
            ->limit(10)
            ->get();

        // get controls statuts
        $applicable = CompCtrls::where(['applicable' => 'Applicable'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();


        $not_applicable = CompCtrls::where(['applicable' => 'Not Applicable'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $partially_imple = CompCtrls::where(['status' => 'Partially Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $implemented = CompCtrls::where(['status' => 'Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();


        if ($request->wantsJson()) {
            return response()->json([
                'documents' => $docs_collection,
                'activities' => $this->activities,
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
            ], 200);
        }
    }

    public function allStandardInfo(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standards' => 'required',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $standards = $request->input('standards');


        // $documents = CompCtrlDocs::select('id', 'comp_id', 'document_id', 'control_id', 'section_id', 'standard_id', 'updated_by', 'created_at', 'updated_at')
        //     // ->with(['control' => function ($query) {
        //     //     $query->select('id', 'name', 'number', 'short_name');
        //     // }])
        //     ->with(['document.controls.control' => function ($query) {
        //         $query->select('id', 'number');
        //     }])
        //     ->with(['document' => function ($query) {
        //         $query->select('id', 'name', 'ext', 'updated_at', 'type');
        //     }])
        //     ->where([
        //         'comp_id' => $comp_id,
        //         'standard_id' => $standard_id
        //     ])
        //     ->get();

        // $docs_collection = new Collection();

        // if (count($documents) > 0) {
        //     foreach ($documents as $doc) {

        //         if (!$docs_collection->containsStrict('document_id', $doc->document_id)) {
        //             $docs_collection->push($doc);
        //         }
        //     }
        // }

        $this->activities = $user->globalActivities()
            ->with(['user', 'control', 'section', 'document'])
            ->where(['comp_id' => $comp_id])->latest()
            ->limit(10)
            ->get();

        // get controls statuts
        $applicable = CompCtrls::where(['applicable' => 'Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->count();


        $not_applicable = CompCtrls::where(['applicable' => 'Not Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->count();

        $not_applicable_controls = CompCtrls::with(['control', 'standard'])->where(['applicable' => 'Not Applicable'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->get();

        $partially_imple = CompCtrls::where(['status' => 'Partially Implemented'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->count();

        $partially_imple_controls = CompCtrls::with(['control', 'standard'])->where(['status' => 'Partially Implemented'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->get();

        $implemented = CompCtrls::where(['status' => 'Implemented'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->count();

        $implemented_controls = CompCtrls::with(['control', 'standard'])->where(['status' => 'Implemented'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->get();

        $excluded = CompCtrls::where(['applicable' => 'Excluded'])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('standard_id', $standards)
            ->count();


        if ($request->wantsJson()) {
            return response()->json([
                'activities' => $this->activities,
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'not_applicable_controls' => $not_applicable_controls,
                'partially_imple_controls' => $partially_imple_controls,
                'implemented_controls' => $implemented_controls,
                'excludeded_controls' => $excluded
            ], 200);
        }
    }

    public function standard_level_info(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standards' => 'required',
            'type' => 'required'
        ]);

        $comp_id = request('comp_id');

        $standards = $request->input('standards');
        $type = $request->input('type');

        if ($type == 'All') {
            $standards = Standard::select('id', 'name', 'slug')
                ->with(['comp_std_priority' => function ($query) {
                    return $query->select('comp_id', 'standard_id', 'priority');
                }])
                ->whereIn('id', $standards)
                ->orderBy('name', 'asc')
                ->get();
        } else {
            $standards = Standard::select('id', 'name', 'slug')
                ->with('comp_controls')
                ->with(['comp_std_priority' => function ($query) {
                    return $query->select('comp_id', 'standard_id', 'priority');
                }])
                ->whereIn('id', $standards)
                ->where('type', $type)
                ->orderBy('name', 'asc')
                ->get();
        }

        return $standards->map(function ($standard, $key) use ($comp_id) {

            // $standard->documents_count = CompCtrlDocs::select('document_id')
            //     ->where(['standard_id' => $standard->id, 'comp_id' => $comp_id])
            //     ->distinct()->count('document_id');

            $standard->documents_count = $this->getStandardDocumentCount($comp_id, $standard->id);

            list($applicable, $not_applicable, $partially_imple, $implemented, $excluded_ctrls) = $this->getStandardChartInfo($comp_id, $standard->id);

            $standard->chart_info = [
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'excluded_ctrls' => $excluded_ctrls
            ];

            return $standard;
        });

        return $standards;
    }

    private function getStandardDocumentCount(int $comp_id, int $standard_id)
    {
        $assigned_standards = CompStandards::where([
            'comp_id' => $comp_id,
        ])->pluck('standard_id')->toArray();

        $standard_controls = CompCtrls::with(['control' => function ($q)  use ($assigned_standards) {
            $q->select('id', 'number', 'name', 'baseline_privacy', 'maturity_level')
                ->with(['mapped.control' => function ($q) use ($assigned_standards) {
                    $q->select('id', 'standard_section_id', 'standard_id')
                        ->with(['standard' => function ($q) {
                            $q->select('id');
                        }])
                        ->whereIn('standard_id', $assigned_standards);
                }]);
        }])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->get();

        $mapped_to_control_ids = $this->getMappedToIdsFromDomainControls($standard_controls);

        $company_control_ids = $this->pluckControlIds($standard_controls);

        return CompCtrlDocs::select('document_id')
                ->where(['comp_id' => $comp_id])
                ->whereIn('control_id',  array_merge($company_control_ids, $mapped_to_control_ids))
                ->distinct()->count('document_id');
    }

    public function sectionInfo(Request $request)
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


        $documents = CompCtrlDocs::select('id', 'comp_id', 'document_id', 'control_id', 'section_id', 'standard_id', 'updated_by', 'created_at', 'updated_at')
            ->with(['document.controls.control' => function ($query) {
                $query->select('id', 'number');
            }])
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'ext', 'updated_at', 'type');
            }])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->get();

        $docs_collection = new Collection();

        if (count($documents) > 0) {
            foreach ($documents as $doc) {

                if (!$docs_collection->containsStrict('document_id', $doc->document_id)) {
                    $docs_collection->push($doc);
                }
            }
        }

        $this->activities = $user->globalActivities()
            ->with(['user', 'control', 'section', 'document'])
            ->where(['comp_id' => $comp_id, 'standard_id' => $standard_id])
            ->whereIn('section_id', $sections)
            ->latest()
            ->limit(10)
            ->get();

        // get controls statuts
        $applicable = CompCtrls::where(['applicable' => 'Applicable'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->count();


        $not_applicable = CompCtrls::where(['applicable' => 'Not Applicable'])
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


        if ($request->wantsJson()) {
            return response()->json([
                'documents' => $docs_collection,
                'activities' => $this->activities,
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
            ], 200);
        }
    }

    public function sectionInfoLimitted(Request $request)
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

        $this->activities = $user->globalActivities()
            ->with(['user', 'control', 'section', 'document'])
            ->where(['comp_id' => $comp_id, 'standard_id' => $standard_id])
            ->whereIn('section_id', $sections)
            ->latest()
            ->limit(10)
            ->get();

        // get controls statuts
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

        // $documents = CompCtrlDocs::with(['control' => function ($query) {
        //     $query->select('id', 'name', 'number', 'short_name');
        // }])
        //     ->with(['document' => function ($query) {
        //         $query->select('id', 'name', 'ext', 'updated_at');
        //     }])
        //     ->where([
        //         'comp_id' => $request->input('comp_id'),
        //         'standard_id' => $standard_id
        //     ])
        //     ->whereIn('section_id', $sections)
        //     ->get();


        if ($request->wantsJson()) {
            return response()->json([
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'excluded_ctrls' => $excluded,
                'activities' => $this->activities,
                // 'section_documents' => $documents,
            ], 200);
        }
    }

    public function getLimittedInfo($comp_id, $standard_id, $sections)
    {

        $user = request()->user();

        $this->activities = $user->globalActivities()
            ->with(['user', 'control', 'section', 'document'])
            ->where(['comp_id' => $comp_id, 'standard_id' => $standard_id])
            ->whereIn('section_id', $sections)
            ->latest()
            ->limit(10)
            ->get();

        // get controls statuts
        $applicable = CompCtrls::where(['applicable' => 'Applicable'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->count();


        $not_applicable = CompCtrls::where(['applicable' => 'Not Applicable'])
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

        $this->control_documents = CompCtrlDocs::with(['control' => function ($query) {
            $query->select('id', 'name', 'number', 'short_name');
        }])
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'ext', 'updated_at', 'created_at', 'type', 'created_by', 'review_at', 'next_review_at')->with('owner');
            }])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->whereIn('section_id', $sections)
            ->get();

        $docs_collection = new Collection();
        $docs_collection = $this->getUniqueDocuments($docs_collection);

        return [
            'applicable_ctrls' => $applicable,
            'not_applicable_ctrls' => $not_applicable,
            'partially_imple_ctrls' => $partially_imple,
            'implemented_ctrls' => $implemented,
            'activities' => $this->activities,
            'documents' => $docs_collection,
        ];
    }

    public function sections(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
        ]);

        $standards = $request->input('standards');
        // $maturity_levels = $request->input('maturity_levels');
        // $control_models = $request->input('control_models');
        // $asset_types = $request->input('asset_types');

        $comp_id = $request->input('comp_id');
        $user = $request->user();

        $parent_sections = StandardSection::select('id', 'menu_name', 'abbreviation', 'description')
            ->with('sections.controls.tasks.task.project')
            ->with(['sections.controls' => function ($q) {
                $q->select('id', 'name', 'number', 'short_name', 'standard_section_id');
            }])
            ->with(['like' => function ($query) use ($comp_id, $user) {
                $query->where(['comp_id' => $comp_id, 'user_id' => $user->id]);
            }])
            ->where(['parent' => null])
            ->whereIn('standard_id', $standards)
            ->get();


        $parent_sections = $parent_sections->map(function ($section, $key) use ($comp_id, $standards) {

            $filtered_sections = $section->sections->map(function ($sec) {
                return $sec->id;
            });

            $authority = CompanySection::where(['comp_id' => $comp_id, 'section_id' => $section->id, 'standard_id' => $standards[0]])->first();

            $section->limitted_info = $this->getLimittedInfo($comp_id, $standards[0], $filtered_sections);

            if ($authority->owner_authority == 'users') {
                // get owners
                $owners = UserSection::with(['user' => function ($q) {
                    $q->select('id', 'first_name', 'last_name');
                }])->select('user_id')
                    ->where([
                        'comp_id' => $comp_id,
                        'section_id' => $section->id,
                        'standard_id' => $standards[0],
                        'enable' => 1
                    ])
                    ->distinct()->get();
                $section->owners = $owners;
                $section->owner_teams = [];
                $section->owner_thirdparty = [];
            } else if ($authority->owner_authority == 'teams') {
                // get teams
                $owner_teams = OwnerTeamSection::with(['team' => function ($q) {
                    $q->select('id', 'name');
                }])
                    ->select('team_id')
                    ->where([
                        'comp_id' => $comp_id,
                        'section_id' => $section->id,
                        'standard_id' => $standards[0],
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
                        'standard_id' => $standards[0],
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
                        'standard_id' => $standards[0],
                        'enable' => 1
                    ])->distinct()
                    ->get();
                $section->custodians = $custodians;
                $section->custodian_teams = [];
                $section->custodian_thirdparty = [];
            } else if ($authority->custodian_authority == 'teams') {
                // get teams
                $custodian_teams = CustodianTeamSection::with(['team' => function ($q) {
                    $q->select('id', 'name');
                }])
                    ->select('team_id')
                    ->where([
                        'comp_id' => $comp_id,
                        'section_id' => $section->id,
                        'standard_id' => $standards[0],
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
                        'standard_id' => $standards[0],
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


        $documents = CompCtrlDocs::with(['control' => function ($query) {
            $query->select('id', 'name', 'number', 'short_name');
        }])
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'ext', 'updated_at', 'created_at', 'type', 'created_by', 'review_at', 'next_review_at')->with('owner');
            }])
            ->where([
                'comp_id' => $request->input('comp_id')
            ])
            ->whereIn('standard_id', $standards)
            ->get();

        // get controls statuts
        // $applicable = CompCtrls::where(['applicable' => 'Applicable'])
        //     ->where([
        //         'comp_id' => $request->input('comp_id')
        //     ])
        //     ->whereIn('standard_id', $standards)->count();

        // $partially_imple = CompCtrls::where(['status' => 'Partially Implemented'])
        //     ->where([
        //         'comp_id' => $request->input('comp_id')
        //     ])
        //     ->whereIn('standard_id', $standards)->count();

        // $implemented = CompCtrls::where(['status' => 'Implemented'])
        //     ->where([
        //         'comp_id' => $request->input('comp_id')
        //     ])
        //     ->whereIn('standard_id', $standards)->count();

        if ($request->wantsJson()) {
            return response()->json([
                'parent_sections' => $parent_sections,
                'users' => $this->listAllUsers($request->input('comp_id')),
                'documents' => $documents,
            ], 200);
        }
    }

    public function apps(Request $request)
    {
        $this->validate($request, [
            // 'section_id' => 'required',
            // 'function_id' => 'required',
            'comp_id' => 'required',
        ]);

        $apps = Application::with('integration')->where(['comp_id' => $request->input('comp_id')])->get();

        if ($request->wantsJson()) {
            return response()->json(['apps' => $apps], 200);
        }
    }

    public function documents(Request $request)
    {
        $this->validate($request, [
            'section_id' => 'required',
            'comp_id' => 'required',
        ]);

        $documents = SectionDocuments::with('document.owner')
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at');
            }])
            ->where(['section_id' => $request->input('section_id'), 'comp_id' => $request->input('comp_id')])->get();

        if ($request->wantsJson()) {
            return response()->json(['documents' => $documents], 200);
        }

        return $documents;
    }

    public function questions(Request $request)
    {
        $this->validate($request, [
            'controls' => 'required',
            'comp_id' => 'required',
        ]);

        $controls = $request->input('controls');
        $comp_id = $request->input('comp_id');

        $this->__syncQuestions($comp_id, $controls);

        $questions = Questionaire::with('question', 'control', 'assets')->whereIn('control_id', $controls)->get();

        $documents = Document::select('id', 'name')->where(['comp_id' => $comp_id])
            ->where(function ($query) {
                $query->where(['type' => 'document'])
                    ->orWhere(['type' => 'file']);
            })->get();

        if ($request->wantsJson()) {
            return response()->json(['questions' => $questions, 'documents' => $documents], 200);
        }

        return $questions;
    }

    /**
     * Sync Questions with Assets belong to the particular company
     *
     * @param [type] $comp_id
     * @param [type] $controls
     * @return void
     */
    public function __syncQuestions($comp_id, $controls)
    {
        $questions = QuestionControls::with('question', 'control')->whereIn('control_id', $controls)->get();
        $apps = Application::where(['comp_id' => $comp_id])->get();

        if (count($questions) > 0) {
            foreach ($questions as $question) {
                if (!Questionaire::where(['question_id' => $question->question_id, 'standard_id' => $question->control->standard_id, 'comp_id' => $comp_id])->first()) {
                    $quesion = Questionaire::create([
                        'question_id' => $question->question_id,
                        'control_id' => $question->control->id,
                        'section_id' => $question->control->standard_section_id,
                        'standard_id' => $question->control->standard_id,
                        'comp_id' => $comp_id,
                        'question_type' => $question->question->question_type,
                        'required' => $question->question->required,
                        'parent' => $question->question->parent
                    ]);

                    if (!QuensAssets::where(['quens_id' => $quesion->id])->first()) {
                        if (count($apps) > 0) {
                            foreach ($apps as $app) {
                                QuensAssets::create([
                                    'quens_id' => $quesion->id,
                                    'app_id' => $app->id
                                ]);
                            }
                        }
                    }
                }
            }
        }
    }

    public function yesNo(Request $request)
    {
        $rules = [
            'applicable' => 'required',
            'question_id' => 'required',
        ];

        $applicable = (bool) $request->input('applicable');


        if ($applicable) {
            $rules['assets'] = 'required';
            $rules['answer'] = 'required';
        }

        $all_assets = (array) $request->input('all_assets');
        $assets = (array) $request->input('assets');
        $answer = (bool) $request->input('answer');


        if (count($all_assets) !== count($assets) ||  $answer === "NO" || !$applicable) {
            $rules['explanation'] = 'required';
        }

        $question_id = $request->input('question_id');
        $explanation = $request->input('explanation');

        $this->validate($request, $rules);

        $question = Questionaire::find($question_id);

        if ($question) {
            $question->yes_no = $answer;
            // $question->answered = 1;
            $question->explanation = $explanation;
            // $question->save();
        }

        // save answer & get back with the updated question
    }

    public function fillIn(Request $request)
    {
        $rules = [
            'applicable' => 'required',
            'question_id' => 'required',
        ];

        $applicable = (bool) $request->input('applicable');


        if ($applicable) {
            $rules['assets'] = 'required';
            $rules['answer'] = 'required';
        }

        $all_assets = (array) $request->input('all_assets');
        $assets = (array) $request->input('assets');
        $answer = (bool) $request->input('answer');


        if (count($all_assets) !== count($assets) || !$applicable) {
            $rules['explanation'] = 'required';
        }

        $this->validate($request, $rules);

        // save answer & get back with the updated question
    }

    public function selectDocAnswer(Request $request)
    {
        $rules = [
            'applicable' => 'required',
            'question_id' => 'required',
        ];

        $applicable = (bool) $request->input('applicable');


        if ($applicable) {
            $rules['assets'] = 'required';
            $rules['answer'] = 'required';
        }

        $all_assets = (array) $request->input('all_assets');
        $assets = (array) $request->input('assets');
        $answer = (bool) $request->input('answer');


        if (count($all_assets) !== count($assets) || !$applicable) {
            $rules['explanation'] = 'required';
        }

        $this->validate($request, $rules);

        // save answer & get back with the updated question
    }

    public function allControls(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
        ]);

        $standard_id = $request->input('standard_id');

        $controls = SectionControl::where(['standard_id' => $standard_id])
            ->select('id', 'number', 'standard_id', 'name')
            ->orderBy('name', 'asc')
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['controls' => $controls], 200);
        }

        return ['controls' => $controls];
    }

    public function allSubDoamins(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standards' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $standards = $request->input('standards');


        $all_standards = Standard::select('id', 'name')
            ->with(['sections' => function ($query) {
                $query->where('parent', '!=', null);
            }])
            ->whereIn('id', $standards)->get();

        return ['all_standards' => $all_standards];
    }

    public function artifacts($standard_id)
    {
        $comp_id = request()->input('comp_id');

        return CompStdDocs::with('document.owner')
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at');
            }])
            ->where(['standard_id' => $standard_id, 'comp_id' => $comp_id])
            ->paginate(5);
    }
}
