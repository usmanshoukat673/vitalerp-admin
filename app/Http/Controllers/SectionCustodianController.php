<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Models\CustodianSection;
use App\Models\CustodianTeamSection;
use App\Models\ThirdPartyCustodianSections;
use Illuminate\Http\Request;

class SectionCustodianController extends Controller
{
    use CompanyCommons;

    public function sectionCustodianInfo(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standard_id' => 'required',
            'sections' => 'required',
            'parent_section_id' => 'required',
        ]);

        // $user = $request->user();
        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        // $sections = $request->input('sections');
        $parent_section_id = $request->input('parent_section_id');

        $users = CustodianSection::select('user_id')->where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id, 'enable' => 1])->distinct()->get();

        $users = $users->map(function ($user) {
            return $user->user_id;
        });

        if ($request->wantsJson()) {
            return response()->json([
                'custodians' => $users,
            ], 200);
        }
    }

    public function saveSectionCustodianInfo(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standard_id' => 'required',
            'psection' => 'required',
            'custodians' => 'required',
        ]);

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $psection = (array) $request->input('psection');
        $custodians = (array)$request->input('custodians');
        $all_users = (array)$request->input('all_users');

        $this->saveCustodian($all_users, $user, $comp_id, $standard_id, $custodians, $psection);

        if ($request->wantsJson()) {
            return response()->json([
                'custodians' => $custodians,
            ], 200);
        }
    }

    public function saveCustodian($all_users, $user, $comp_id, $standard_id, $custodians, $psection)
    {
        if (count($all_users) > 0) {
            foreach ($all_users as $user_id) {

                $aSection = $this->sectionAssigned($psection['id'], $user_id, $comp_id, $standard_id);

                if (in_array($user_id, $custodians)) {
                    // assiging if not already assigned
                    if ($aSection && $aSection->enable == 0) {
                        $aSection->enable = 1;
                        $aSection->save();
                    } elseif (!$aSection) {
                        $this->assignNewSection($psection['id'], $user_id, $comp_id, $standard_id, $user->id);
                    }
                } else {
                    // remove / disable
                    if ($aSection) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                }

                foreach ($psection['sections'] as $csection) {
                    $childSection = $this->sectionAssigned($csection['id'], $user_id, $comp_id, $standard_id);
                    if (in_array($user_id, $custodians)) {

                        if ($childSection && $childSection->enable === 0) {
                            $childSection->enable = 1;
                            $childSection->save();
                        } elseif (!$childSection) {
                            $this->assignNewSection($csection['id'], $user_id, $comp_id, $standard_id, $user->id, $csection['parent']);
                        }
                    } else {
                        // remove / disable
                        if ($childSection) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    }
                }
            }
        }
    }

    public function removeCustodian($all_users, $comp_id, $standard_id, $custodians, $psection)
    {
        if (count($all_users) > 0) {
            foreach ($all_users as $user_id) {
                $aSection = $this->sectionAssigned($psection['id'], $user_id, $comp_id, $standard_id);
                if (in_array($user_id, $custodians)) {
                    // disable if not already assigned
                    if ($aSection && $aSection->enable == 1) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                } else {
                    // remove / disable
                    if ($aSection) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                }

                foreach ($psection['sections'] as $csection) {
                    $childSection = $this->sectionAssigned($csection['id'], $user_id, $comp_id, $standard_id);
                    if (in_array($user_id, $custodians)) {

                        if ($childSection && $childSection->enable === 1) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    } else {
                        // remove / disable
                        if ($childSection) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    }
                }
            }
        }
    }

    public function sectionAssigned($section_id, $user_id, $comp_id, $standard_id)
    {
        return CustodianSection::where(['comp_id' => $comp_id, 'section_id' => $section_id, 'standard_id' => $standard_id, 'user_id' => $user_id])->first();
    }

    public function assignNewSection($section_id, $user_id, $comp_id, $standard_id, $assigned_by, $parent = null)
    {
        return CustodianSection::create([
            'section_id' => $section_id,
            'user_id' => $user_id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'parent' => $parent,
            'assigned_by' => $assigned_by,
        ]);
    }

    public function saveTeamCustodian($all_teams, $user, $comp_id, $standard_id, $psection, $teams)
    {
        if (count($all_teams) > 0) {
            foreach ($all_teams as $team_id) {

                $aSection = $this->teamSectionAssigned($psection['id'], $team_id, $comp_id, $standard_id);

                if (in_array($team_id, $teams)) {
                    // assiging if not already assigned
                    if ($aSection && $aSection->enable == 0) {
                        $aSection->enable = 1;
                        $aSection->save();
                    } elseif (!$aSection) {
                        $this->assignNewTeamSection($psection['id'], $team_id, $comp_id, $standard_id, $user->id);
                    }
                } else {
                    // remove / disable
                    if ($aSection) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                }

                foreach ($psection['sections'] as $csection) {
                    $childSection = $this->teamSectionAssigned($csection['id'], $team_id, $comp_id, $standard_id);
                    if (in_array($team_id, $teams)) {

                        if ($childSection && $childSection->enable === 0) {
                            $childSection->enable = 1;
                            $childSection->save();
                        } elseif (!$childSection) {
                            $this->assignNewTeamSection($csection['id'], $team_id, $comp_id, $standard_id, $user->id, $csection['parent']);
                        }
                    } else {
                        // remove / disable
                        if ($childSection) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    }
                }
            }
        }
    }

    public function removeTeamCustodian($all_teams, $comp_id, $standard_id, $psection, $teams)
    {
        if (count($all_teams) > 0) {
            foreach ($all_teams as $team_id) {

                $aSection = $this->teamSectionAssigned($psection['id'], $team_id, $comp_id, $standard_id);

                if (in_array($team_id, $teams)) {
                    // assiging if not already assigned
                    if ($aSection && $aSection->enable == 1) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                } else {
                    // remove / disable
                    if ($aSection) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                }

                foreach ($psection['sections'] as $csection) {
                    $childSection = $this->teamSectionAssigned($csection['id'], $team_id, $comp_id, $standard_id);
                    if (in_array($team_id, $teams)) {

                        if ($childSection && $childSection->enable === 1) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    } else {
                        // remove / disable
                        if ($childSection) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    }
                }
            }
        }
    }

    public function teamSectionAssigned($section_id, $team_id, $comp_id, $standard_id)
    {
        return CustodianTeamSection::where(['comp_id' => $comp_id, 'section_id' => $section_id, 'standard_id' => $standard_id, 'team_id' => $team_id])->first();
    }

    public function assignNewTeamSection($section_id, $team_id, $comp_id, $standard_id, $assigned_by, $parent = null)
    {
        return CustodianTeamSection::create([
            'section_id' => $section_id,
            'team_id' => $team_id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'parent' => $parent,
            'assigned_by' => $assigned_by,
        ]);
    }

    public function saveTPCustodians($all_thirdparties, $user, $comp_id, $standard_id, $psection, $custodian_thirdparty)
    {
        if (count($all_thirdparties) > 0) {
            foreach ($all_thirdparties as $tp_id) {

                $aSection = $this->tpCustodianSectionAssigned($psection['id'], $tp_id, $comp_id, $standard_id);

                if (in_array($tp_id, $custodian_thirdparty)) {
                    // assiging if not already assigned
                    if ($aSection && $aSection->enable == 0) {
                        $aSection->enable = 1;
                        $aSection->save();
                    } elseif (!$aSection) {
                        $this->assignNewTPCustodianSection($psection['id'], $tp_id, $comp_id, $standard_id, $user->id);
                    }
                } else {
                    // remove / disable
                    if ($aSection) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                }

                foreach ($psection['sections'] as $csection) {
                    $childSection = $this->tpCustodianSectionAssigned($csection['id'], $tp_id, $comp_id, $standard_id);
                    if (in_array($tp_id, $custodian_thirdparty)) {

                        if ($childSection && $childSection->enable === 0) {
                            $childSection->enable = 1;
                            $childSection->save();
                        } elseif (!$childSection) {
                            $this->assignNewTPCustodianSection($csection['id'], $tp_id, $comp_id, $standard_id, $user->id, $csection['parent']);
                        }
                    } else {
                        // remove / disable
                        if ($childSection) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    }
                }
            }
        }
    }

    public function removeTPCustodians($all_thirdparties, $comp_id, $standard_id, $psection, $custodian_thirdparty)
    {
        if (count($all_thirdparties) > 0) {
            foreach ($all_thirdparties as $tp_id) {

                $aSection = $this->tpCustodianSectionAssigned($psection['id'], $tp_id, $comp_id, $standard_id);

                if (in_array($tp_id, $custodian_thirdparty)) {
                    // assiging if not already assigned
                    if ($aSection && $aSection->enable == 1) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                } else {
                    // remove / disable
                    if ($aSection) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                }

                foreach ($psection['sections'] as $csection) {
                    $childSection = $this->tpCustodianSectionAssigned($csection['id'], $tp_id, $comp_id, $standard_id);
                    if (in_array($tp_id, $custodian_thirdparty)) {

                        if ($childSection && $childSection->enable === 1) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    } else {
                        // remove / disable
                        if ($childSection) {
                            $childSection->enable = 0;
                            $childSection->save();
                        }
                    }
                }
            }
        }
    }

    public function tpCustodianSectionAssigned($section_id, $tp_id, $comp_id, $standard_id)
    {
        return ThirdPartyCustodianSections::where(['comp_id' => $comp_id, 'section_id' => $section_id, 'standard_id' => $standard_id, 'tp_id' => $tp_id])->first();
    }

    public function assignNewTPCustodianSection($section_id, $tp_id, $comp_id, $standard_id, $assigned_by, $parent = null)
    {
        return ThirdPartyCustodianSections::create([
            'section_id' => $section_id,
            'tp_id' => $tp_id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'parent' => $parent,
            'assigned_by' => $assigned_by,
        ]);
    }
}
