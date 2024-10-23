<?php

namespace App\Http\Controllers;

use App\Models\CompCtrls;
use App\Models\GlobalActivities;
use App\Models\RiskRegisterCst;
use App\Models\RiskRegisterStd;
use App\Models\SectionControl;
use App\Models\UserCompanies;
use Illuminate\Http\Request;

class RiskRegisterController extends Controller
{
    public function questions($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        $questions = RiskRegisterStd::with(['control' => function ($query) {
            $query->select('id', 'number', 'name');
        }])
            ->with(['section' => function ($query) {
                $query->select('id', 'name');
            }])
            ->with(['question' => function ($query) {
                $query->select('id', 'name', 'question');
            }])
            ->with(['standard' => function ($query) {
                $query->select('id', 'name');
            }])
            ->where(['comp_id' => $comp_id])->get();

        $custom_questions = RiskRegisterCst::where(['comp_id' => $comp_id])->get();


        return response()->json(['questions' => $questions, 'custom_questions' => $custom_questions, 'users' => $this->listAllUsers($comp_id)], 200);
    }

    public function saveProperties(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:risk_register_stds,id',
            'property' => 'required',
        ]);

        $property = $request->input('property');

        if (in_array($property, ['answer', 'notes', 'severity', 'probabaility', 'risk_rating', 'risk_action', 'risk_owner_id'])) {
            $user = $request->user();
            $id = $request->input('id');
            $value = $request->input('value');
            RiskRegisterStd::where(['id' => $id])->update([
                $property => ($value ? $value : null),
                'updated_by' => $user->id
            ]);

            return response()->json([], 200);
        }

        abort(404);
    }

    public function saveCustomProperties(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:risk_register_csts,id',
            'property' => 'required',
        ]);

        $property = $request->input('property');

        if (in_array($property, ['severity', 'probabaility', 'risk_rating', 'risk_action', 'risk_owner_id'])) {
            $user = $request->user();
            $id = $request->input('id');
            $value = $request->input('value');
            RiskRegisterCst::where(['id' => $id])->update([
                $property => ($value ? $value : null),
                'updated_by' => $user->id
            ]);

            return response()->json([], 200);
        }

        abort(404);
    }

    public function listAllUsers($id)
    {
        //TODO: needs to check wheter the user is allowed to view company users or not

        if (!$id) {
            abort(404);
        }

        $user = request()->user();

        $users = UserCompanies::with(['user' => function ($query) {
            $query->select('id', 'first_name', 'last_name', 'email');
        }])
            ->with(['company' => function ($query) {
                $query->select('id', 'name');
            }])
            ->where(['comp_id' => $id])->get();

        return $users;
    }

    public function addCustomIssue(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'standard_name' => 'required',
            'domain_name' => 'required',
            'risk_control' => 'required',
            'question' => 'required'
        ]);

        $comp_id = $request->input('comp_id');
        $standard_name = $request->input('standard_name');
        $domain_name = $request->input('domain_name');
        $risk_control = $request->input('risk_control');
        $question = $request->input('question');
        $issue_id = $request->input('issue_id');
        $severity = $request->input('severity');
        $probabaility = $request->input('probabaility');
        $risk_action = $request->input('risk_action');
        $risk_owner_id = $request->input('risk_owner_id');

        $issue = RiskRegisterCst::create([
            'comp_id' => $comp_id,
            'risk_id' => $issue_id,
            'question' => $question,
            'control' => $risk_control,
            'section' => $domain_name,
            'standard' => $standard_name,
            'risk_owner_id' => $risk_owner_id,
            'severity' => $severity,
            'probabaility' => $probabaility,
            'risk_rating' => ($severity > 0 && $probabaility > 0 ? $severity * $probabaility : null),
            'risk_action' => $risk_action,
            'updated_by' => $request->user()->id,
        ]);

        return response()->json(['issue' => $issue], 200);
    }

    public function updateCustomIssue(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'question_id' => 'required|exists:risk_register_csts,id',
            'standard_name' => 'required',
            'risk_control' => 'required',
            'question' => 'required'
        ]);

        $comp_id = $request->input('comp_id');
        $standard_name = $request->input('standard_name');
        $domain_name = $request->input('domain_name');
        $risk_control = $request->input('risk_control');
        $question = $request->input('question');
        $issue_id = $request->input('issue_id');
        $severity = $request->input('severity');
        $probabaility = $request->input('probabaility');
        $risk_action = $request->input('risk_action');
        $risk_owner_id = $request->input('risk_owner_id');
        $question_id = $request->input('question_id');

        $issue = RiskRegisterCst::where(['id' => $question_id, 'comp_id' => $comp_id])
            ->update([
                'risk_id' => $issue_id,
                'question' => $question,
                'control' => $risk_control,
                'section' => $domain_name,
                'standard' => $standard_name,
                'risk_owner_id' => $risk_owner_id,
                'severity' => $severity,
                'probabaility' => $probabaility,
                'risk_rating' => ($severity > 0 && $probabaility > 0 ? $severity * $probabaility : null),
                'risk_action' => $risk_action,
                'updated_by' => $request->user()->id,
            ]);

        return response()->json(['issue' => RiskRegisterCst::where(['id' => $question_id, 'comp_id' => $comp_id])->first()], 200);
    }

    public function saveControlProperties(Request $request)
    {
        $this->validate($request, [
            'property_id' => 'required|exists:comp_ctrls,id',
            // 'control_id' => 'required|exists:comp_ctrls,id',
            // 'comp_id' => 'required|exists:comp_ctrls,id',
            'property' => 'required',
        ]);

        $property = $request->input('property');

        if (in_array($property, ['status', 'applicable', 'justification'])) {
            $user = $request->user();
            $property_id = $request->input('property_id');
            $value = $request->input('value');
            CompCtrls::where(['id' => $property_id])->update([
                $property => ($value ? $value : null),
                'updated_by' => $user->id
            ]);

            $control_id = $request->input('property_id');

            $comp_ctr_prop = CompCtrls::find($property_id);
            $activity = 'Applicability';
            $column = 'ctrl_applicability';

            if ($property === 'applicable') {
                $activity = 'Applicability';
                $column = 'ctrl_applicability';
            } else if ($property === 'status') {
                $activity = 'Status';
                $column = 'ctrl_status';
            }

            GlobalActivities::create([
                'comp_id' => $comp_ctr_prop->comp_id,
                'user_id' => $user->id,
                'activity' => $activity,
                'event_type' => 'control',
                $column => $value,
                'standard_id' => $comp_ctr_prop->standard_id,
                'section_id' => $comp_ctr_prop->section_id,
                'control_id' => $comp_ctr_prop->control_id,
                'page' => 'Compliance',
            ]);

            // $control = SectionControl::with([
            //     'maturityLevel',
            //     'ctlfunction',
            //     'models',
            //     'assets',
            //     'assessment_question.question',
            //     'tags.tag',
            //     'properties',
            //     'artifacts.document'
            // ])->find($control_id);

            return response()->json(['control' => $control_id], 200);
        }

        abort(404);
    }

    public function deleteCustomQue(Request $request)
    {
        $this->validate($request, [
            'id' => 'required|exists:risk_register_csts,id',
            'comp_id' => 'required',
        ]);

        $id = $request->input('id');
        $comp_id = $request->input('comp_id');

        if (RiskRegisterCst::where(['id' => $id, 'comp_id' => $comp_id])->delete()) {
            return response()->json([], 200);
        } else {
            return abort(404);
        }
    }
}
