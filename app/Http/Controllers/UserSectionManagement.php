<?php

namespace App\Http\Controllers;

use App\Models\StandardSection;
use App\Models\UserCompanies;
use App\Models\UserSection;
use Illuminate\Http\Request;

class UserSectionManagement extends Controller
{
    /**
     * list domains
     *
     * @param [type] $comp_id
     * @return void
     */
    public function list(Request $request)
    {
        $this->validate($request, [
            'standards' => 'required',
            'comp_id' => 'required',
        ]);

        $standards = $request->input('standards');
        $comp_id = $request->input('comp_id');

        $sections = StandardSection::with('standard')
            ->whereIn('standard_id', $standards)
            ->orderBy('standard_id')->paginate(10);


        if (request()->wantsJson()) {
            return response()->json(['sections' => $sections], 200);
        }


        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company



        // $parent_sections = UserSection::with('section')
        //     ->where(['user_id' => $user->id, 'comp_id' => $comp_id, 'parent' => null])
        //     ->get();


        // if (request()->wantsJson()) {
        //     return response()->json(['parent_sections' => $parent_sections], 200);
        // }

        // return $parent_sections;
    }

    public function profile($comp_id, $section_id)
    {
        if (!$comp_id || !$section_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $section = StandardSection::with('users.user', 'users.assignee', 'standard')
            ->with(['users' => function ($q) use ($comp_id) {
                $q->where(['comp_id' => $comp_id]);
            }])
            ->find($section_id);


        if (request()->wantsJson()) {
            return response()->json(['section' => $section], 200);
        }

        return $section;
    }

    public function getUsersToAssign($comp_id, $section_id)
    {
        if (!$comp_id || !$section_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $users = UserCompanies::where(['comp_id' => $comp_id])->get();

        $section_users = UserSection::select('user_id')->where(['section_id' => $section_id, 'comp_id' => $comp_id, 'enable' => 1])->get();

        $existings_users = [];

        if (count($section_users) > 0) {
            foreach ($section_users as $user) {
                array_push($existings_users, $user->user_id);
            }
        }

        $users = $users->whereNotIn('user_id', $existings_users);

        if (request()->wantsJson()) {
            return response()->json(['users' => $users], 200);
        }

        return $users;
    }

    public function assignUser(Request $request)
    {
        $this->validate($request, [
            'section_id' => 'required|exists:standard_sections,id',
            'user_id' => 'required|exists:users,id',
            'comp_id' => 'required',
        ]);

        $user_id = $request->input('user_id');
        $section_id = $request->input('section_id');
        $comp_id = $request->input('comp_id');

        $section = StandardSection::find($section_id);

        if (UserSection::where(['user_id' => $user_id, 'section_id' => $section_id, 'enable' => 1, 'comp_id' => $comp_id])->first()) {
            if (request()->wantsJson()) {
                return response()->json(['error_message' => 'User already exists in the team!'], 422);
            }
        }

        // send notifications to existing team users
        // $users = User::rightJoin('team_users', 'users.id', '=', 'team_users.user_id')
        //     ->select('users.*')
        //     ->where(['team_users.section_id' => $request->input('section_id')])
        //     ->get();

        // if (count($users) > 0) {
        //     $this->sendJoinedNotification($users, $request);
        // }

        if ($user = UserSection::where(['user_id' => $user_id, 'section_id' => $section_id, 'comp_id' => $comp_id])->first()) {
            $user->enable = 1;
            $user->save();
        } else {
            $user =  UserSection::create([
                'user_id' => $user_id,
                'section_id' => $section_id,
                'comp_id' => $comp_id,
                'parent' => $section->parent,
                'standard_id' => $section->standard_id,
                'assigned_by' => $request->user()->id,
                'enable' => 1
            ]);
        }

        $user = UserSection::with(['user', 'assignee'])->where(['user_id' => $user->user_id, 'section_id' => $user->section_id, 'comp_id' => $comp_id])->first();

        if (request()->wantsJson()) {
            return response()->json(['user' => $user], 200);
        }

        return true;
    }

    public function removeUser(Request $request)
    {
        $this->validate($request, [
            'section_id' => 'required|exists:standard_sections,id',
            'user_id' => 'required|exists:users,id',
            'comp_id' => 'required|exists:users,id',
        ]);

        $user_id = $request->input('user_id');
        $section_id = $request->input('section_id');
        $comp_id = $request->input('comp_id');

        UserSection::where(['user_id' => $user_id, 'section_id' => $section_id, 'enable' => 1, 'comp_id' => $comp_id])
            ->update(['enable' => 0]);

        if (request()->wantsJson()) {
            return response()->json(['message' => 'deleted'], 200);
        }

        return true;
    }
}
