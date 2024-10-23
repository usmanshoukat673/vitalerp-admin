<?php

namespace App\Http\Controllers;

use App\Http\Traits\CompanyCommons;
use App\Models\CompanySection;
use App\Models\CustodianSection;
use App\Models\CustodianTeamSection;
use App\Models\OwnerTeamSection;
use App\Models\Team;
use App\Models\ThirdParty;
use App\Models\ThirdPartyCustodianSections;
use App\Models\ThirdPartyOwnerSections;
use App\Models\UserSection;
use Illuminate\Http\Request;

class SectionOwnerController extends Controller
{
    use CompanyCommons;

    public function sectionOwnerInfo(Request $request)
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

        $owners = UserSection::select('user_id')->where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id, 'enable' => 1])->distinct()->get();

        $owners = $owners->map(function ($user) {
            return $user->user_id;
        });

        $owner_teams = OwnerTeamSection::select('team_id')->where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id, 'enable' => 1])->distinct()->get();

        $owner_teams = $owner_teams->map(function ($team) {
            return $team->team_id;
        });

        $owner_thirdparty = ThirdPartyOwnerSections::select('tp_id')->where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id, 'enable' => 1])->distinct()->get();

        $owner_thirdparty = $owner_thirdparty->map(function ($team) {
            return $team->tp_id;
        });

        $custodians = CustodianSection::select('user_id')->where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id, 'enable' => 1])->distinct()->get();

        $custodians = $custodians->map(function ($user) {
            return $user->user_id;
        });

        $custodian_teams = CustodianTeamSection::select('team_id')->where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id, 'enable' => 1])->distinct()->get();

        $custodian_teams = $custodian_teams->map(function ($team) {
            return $team->team_id;
        });

        $custodian_thirdparty = ThirdPartyCustodianSections::select('tp_id')->where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id, 'enable' => 1])->distinct()->get();

        $custodian_thirdparty = $custodian_thirdparty->map(function ($team) {
            return $team->tp_id;
        });

        $authority = CompanySection::where(['comp_id' => $comp_id, 'section_id' => $parent_section_id, 'standard_id' => $standard_id])->first();

        $all_teams = Team::where(['comp_id' => $comp_id])->orderby('name', 'asc')->get();
        $all_thirdparties = ThirdParty::where(['comp_id' => $comp_id])->orderby('name', 'asc')->get();

        if ($request->wantsJson()) {
            return response()->json([
                'owners' => $owners,
                'owner_autority' => $authority->owner_authority,
                'custodians' => $custodians,
                'custodian_autority' => $authority->custodian_authority,
                'all_teams' => $all_teams,
                'owner_teams' => $owner_teams,
                'custodian_teams' => $custodian_teams,
                'owner_thirdparty' => $owner_thirdparty,
                'custodian_thirdparty' => $custodian_thirdparty,
                'all_thirdparties' => $all_thirdparties,
            ], 200);
        }
    }

    public function saveSectionOwnerInfo(Request $request, SectionCustodianController $sectionCustodianController)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standard_id' => 'required',
            'psection' => 'required',
            'owner_type' => 'required',
            'custodian_type' => 'required',
            'all_users' => 'required',
            'all_teams' => 'required',
        ]);


        $owner_type = $request->input('owner_type');

        if ($owner_type === 'users') {
            $this->validate($request, [
                'owners' => 'required',
            ]);
        } else if ($owner_type === 'teams') {
            $this->validate($request, [
                'owner_teams' => 'required',
            ]);
        } else {
            $this->validate($request, [
                'owner_thirdparty' => 'required',
            ]);
        }

        $custodian_type = $request->input('custodian_type');

        if ($custodian_type === 'users') {
            $this->validate($request, [
                'custodians' => 'required',
            ]);
        } elseif ($custodian_type === 'teams') {
            $this->validate($request, [
                'custodian_teams' => 'required',
            ]);
        } else {
            $this->validate($request, [
                'custodian_thirdparty' => 'required',
            ]);
        }

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $psection = (array) $request->input('psection');
        $owners = (array)$request->input('owners');
        $all_users = (array)$request->input('all_users');
        $all_teams = (array)$request->input('all_teams');
        $owner_teams = (array)$request->input('owner_teams');
        $custodians = (array)$request->input('custodians');
        $custodian_teams = (array)$request->input('custodian_teams');
        $owner_thirdparty = (array)$request->input('owner_thirdparty');
        $custodian_thirdparty = (array)$request->input('custodian_thirdparty');
        $all_thirdparties = (array)$request->input('all_thirdparties');


        // OWNER
        if ($owner_type === 'users') {
            // remove team and assign users
            $this->saveOwners($all_users, $user, $comp_id, $standard_id, $psection, $owners);
            $this->removeTeamOwners($all_teams, $comp_id, $standard_id, $psection, $owner_teams);
            $this->removeTPOwners($all_thirdparties, $comp_id, $standard_id, $psection, $owner_thirdparty);
        } elseif ($owner_type === 'teams') {
            // remove users and assign teams
            $this->saveTeamOwners($all_teams, $user, $comp_id, $standard_id, $psection, $owner_teams);
            $this->removeOwners($all_users, $comp_id, $standard_id, $psection, $owners);
            $this->removeTPOwners($all_thirdparties, $comp_id, $standard_id, $psection, $owner_thirdparty);
        } else {
            // renove users, teams & assign third party
            $this->saveTPOwners($all_thirdparties, $user, $comp_id, $standard_id, $psection, $owner_thirdparty);
            $this->removeOwners(
                $all_users,
                $comp_id,
                $standard_id,
                $psection,
                $owners
            );
            $this->removeTeamOwners($all_teams, $comp_id, $standard_id, $psection, $owner_teams);
        }

        // CUSTODIAN
        if ($custodian_type === 'users') {
            // remove team and assign users
            $sectionCustodianController->saveCustodian($all_users, $user, $comp_id, $standard_id, $custodians, $psection);
            $sectionCustodianController->removeTeamCustodian($all_teams, $comp_id, $standard_id, $psection, $custodian_teams);
            $sectionCustodianController->removeTPCustodians($all_thirdparties, $comp_id, $standard_id, $psection, $custodian_thirdparty);
        } elseif ($custodian_type === 'teams') {
            // remove users and assign teams
            $sectionCustodianController->saveTeamCustodian($all_teams, $user, $comp_id, $standard_id, $psection, $custodian_teams);
            $sectionCustodianController->removeCustodian($all_users, $comp_id, $standard_id, $custodians, $psection);
            $sectionCustodianController->removeTPCustodians($all_thirdparties, $comp_id, $standard_id, $psection, $custodian_thirdparty);
        } else {
            $sectionCustodianController->saveTPCustodians($all_thirdparties, $user, $comp_id, $standard_id, $psection, $custodian_thirdparty);
            $sectionCustodianController->removeTeamCustodian($all_teams, $comp_id, $standard_id, $psection, $custodian_teams);
            $sectionCustodianController->removeCustodian($all_users, $comp_id, $standard_id, $custodians, $psection);
        }

        CompanySection::where(['comp_id' => $comp_id, 'parent' => $psection['id'], 'standard_id' => $standard_id])
            ->update(['owner_authority' => $owner_type, 'custodian_authority' => $custodian_type]);

        CompanySection::where(['comp_id' => $comp_id, 'section_id' => $psection['id'], 'standard_id' => $standard_id])
            ->update(['owner_authority' => $owner_type, 'custodian_authority' => $custodian_type]);

        // new info
        $owners = UserSection::with(['user' => function ($q) {
            $q->select('id', 'first_name', 'last_name');
        }])->select('user_id')
            ->where([
                'comp_id' => $comp_id,
                'section_id' => $psection['id'],
                'standard_id' => $standard_id,
                'enable' => 1
            ])
            ->distinct()->get();

        $owner_teams = OwnerTeamSection::with(['team' => function ($q) {
            $q->select('id', 'name');
        }])
            ->select('team_id')
            ->where([
                'comp_id' => $comp_id,
                'section_id' => $psection['id'],
                'standard_id' => $standard_id,
                'enable' => 1
            ])
            ->distinct()->get();

        $owner_thirdparty = ThirdPartyOwnerSections::with(['thirdparty' => function ($q) {
            $q->select('id', 'name');
        }])
            ->select('tp_id')
            ->where([
                'comp_id' => $comp_id,
                'section_id' => $psection['id'],
                'standard_id' => $standard_id,
                'enable' => 1
            ])
            ->distinct()->get();

        $custodians = CustodianSection::with(['user' => function ($q) {
            $q->select('id', 'first_name', 'last_name');
        }])
            ->select('user_id')
            ->where([
                'comp_id' => $comp_id,
                'section_id' => $psection['id'],
                'standard_id' => $standard_id,
                'enable' => 1
            ])->distinct()
            ->get();

        $custodian_teams = CustodianTeamSection::with(['team' => function ($q) {
            $q->select('id', 'name');
        }])
            ->select('team_id')
            ->where([
                'comp_id' => $comp_id,
                'section_id' => $psection['id'],
                'standard_id' => $standard_id,
                'enable' => 1
            ])
            ->distinct()
            ->get();

        $custodian_thirdparty = ThirdPartyCustodianSections::with(['thirdparty' => function ($q) {
            $q->select('id', 'name');
        }])
            ->select('tp_id')
            ->where([
                'comp_id' => $comp_id,
                'section_id' => $psection['id'],
                'standard_id' => $standard_id,
                'enable' => 1
            ])
            ->distinct()->get();

        if ($request->wantsJson()) {
            return response()->json([
                'new_resposibilities' => [
                    'owners' => $owners,
                    'custodians' => $custodians,
                    'custodian_teams' => $custodian_teams,
                    'owner_teams' => $owner_teams,
                    'owner_thirdparty' => $owner_thirdparty,
                    'custodian_thirdparty' => $custodian_thirdparty,
                ]
            ], 200);
        }
    }

    public function saveOwners($all_users, $user, $comp_id, $standard_id, $psection, $owners)
    {
        if (count($all_users) > 0) {
            foreach ($all_users as $user_id) {

                $aSection = $this->sectionAssigned($psection['id'], $user_id, $comp_id, $standard_id);

                if (in_array($user_id, $owners)) {
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
                    if (in_array($user_id, $owners)) {

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

    public function removeOwners($all_users, $comp_id, $standard_id, $psection, $owners)
    {
        if (count($all_users) > 0) {
            foreach ($all_users as $user_id) {

                $aSection = $this->sectionAssigned($psection['id'], $user_id, $comp_id, $standard_id);

                if (in_array($user_id, $owners)) {
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
                    $childSection = $this->sectionAssigned($csection['id'], $user_id, $comp_id, $standard_id);
                    if (in_array($user_id, $owners)) {
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
        return UserSection::where(['comp_id' => $comp_id, 'section_id' => $section_id, 'standard_id' => $standard_id, 'user_id' => $user_id])->first();
    }

    public function assignNewSection($section_id, $user_id, $comp_id, $standard_id, $assigned_by, $parent = null)
    {
        return UserSection::create([
            'section_id' => $section_id,
            'user_id' => $user_id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'parent' => $parent,
            'assigned_by' => $assigned_by,
        ]);
    }

    public function saveTeamOwners($all_teams, $user, $comp_id, $standard_id, $psection, $teams)
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

    public function removeTeamOwners($all_teams, $comp_id, $standard_id, $psection, $teams)
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

    public function saveTPOwners($all_thirdparties, $user, $comp_id, $standard_id, $psection, $owner_thirdparty)
    {
        if (count($all_thirdparties) > 0) {
            foreach ($all_thirdparties as $tp_id) {

                $aSection = $this->tpOwnerSectionAssigned($psection['id'], $tp_id, $comp_id, $standard_id);

                if (in_array($tp_id, $owner_thirdparty)) {
                    // assiging if not already assigned
                    if ($aSection && $aSection->enable == 0) {
                        $aSection->enable = 1;
                        $aSection->save();
                    } elseif (!$aSection) {
                        $this->assignNewTPOwnerSection($psection['id'], $tp_id, $comp_id, $standard_id, $user->id);
                    }
                } else {
                    // remove / disable
                    if ($aSection) {
                        $aSection->enable = 0;
                        $aSection->save();
                    }
                }

                foreach ($psection['sections'] as $csection) {
                    $childSection = $this->tpOwnerSectionAssigned($csection['id'], $tp_id, $comp_id, $standard_id);
                    if (in_array($tp_id, $owner_thirdparty)) {

                        if ($childSection && $childSection->enable === 0) {
                            $childSection->enable = 1;
                            $childSection->save();
                        } elseif (!$childSection) {
                            $this->assignNewTPOwnerSection($csection['id'], $tp_id, $comp_id, $standard_id, $user->id, $csection['parent']);
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

    public function removeTPOwners($all_thirdparties, $comp_id, $standard_id, $psection, $owner_thirdparty)
    {
        if (count($all_thirdparties) > 0) {
            foreach ($all_thirdparties as $tp_id) {

                $aSection = $this->tpOwnerSectionAssigned($psection['id'], $tp_id, $comp_id, $standard_id);

                if (in_array($tp_id, $owner_thirdparty)) {
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
                    $childSection = $this->tpOwnerSectionAssigned($csection['id'], $tp_id, $comp_id, $standard_id);
                    if (in_array($tp_id, $owner_thirdparty)) {

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
        return OwnerTeamSection::where(['comp_id' => $comp_id, 'section_id' => $section_id, 'standard_id' => $standard_id, 'team_id' => $team_id])->first();
    }

    public function assignNewTeamSection($section_id, $team_id, $comp_id, $standard_id, $assigned_by, $parent = null)
    {
        return OwnerTeamSection::create([
            'section_id' => $section_id,
            'team_id' => $team_id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'parent' => $parent,
            'assigned_by' => $assigned_by,
        ]);
    }

    public function tpOwnerSectionAssigned($section_id, $tp_id, $comp_id, $standard_id)
    {
        return ThirdPartyOwnerSections::where(['comp_id' => $comp_id, 'section_id' => $section_id, 'standard_id' => $standard_id, 'tp_id' => $tp_id])->first();
    }

    public function assignNewTPOwnerSection($section_id, $tp_id, $comp_id, $standard_id, $assigned_by, $parent = null)
    {
        return ThirdPartyOwnerSections::create([
            'section_id' => $section_id,
            'tp_id' => $tp_id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'parent' => $parent,
            'assigned_by' => $assigned_by,
        ]);
    }
}
