<?php

namespace App\Http\Traits;

use App\Models\CompStandards;
use App\Models\GlobalActivities;
use App\Models\UserCompanies;

trait CompanyCommons
{
    public function listAllUsers($comp_id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$comp_id) {
            abort(404);
        }

        // $user = request()->user();

        $users = UserCompanies::with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'email');
        }])
            ->with(['company' => function ($query) {
                $query->select('id', 'name');
            }])
            ->where(['comp_id' => $comp_id])->get();

        return $users;
    }

    public function storeActivity($comp_id, $user_id, $activity, $event_type, $page, $description, $subject_id = null, $subject_type = null, $document_id = null)
    {
        return GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => $user_id,
            'activity' => $activity,
            'event_type' => $event_type,
            'page' => $page,
            'description' => $description,
            'subject_id' => $subject_id,
            'subject_type' => $subject_type,
            'document_id' => $document_id,
        ]);
    }

    public function __standards($comp_id)
    {
        $standards = CompStandards::select('comp_id', 'standard_id')->with('standard')->where(['comp_id' => $comp_id])->get();
        $filtered_standards = [];
        if (count($standards) > 0) {
            foreach ($standards as $std) {
                array_push($filtered_standards, $std->standard_id);
            }
        }

        return $filtered_standards;
    }

    private function getAllCompanies($user_id)
    {
        return UserCompanies::select('comp_id')->where(['user_id' => $user_id])->get()->each->setAppends([])->toArray();
    }
}
