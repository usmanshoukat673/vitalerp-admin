<?php

namespace App\Http\Controllers;

use App\Models\RiskRegisterCst;
use App\Models\RiskRegisterStd;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PoamManager extends Controller
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
            ->where(['comp_id' => $comp_id, 'poam' => true])->get();

        $custom_questions = RiskRegisterCst::where(['comp_id' => $comp_id, 'poam' => true])->get();


        return response()->json(['questions' => $questions, 'custom_questions' => $custom_questions], 200);
    }

    public function addCustomPoam(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'question_id' => 'required|exists:risk_register_csts,id',
            'plan' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $severity = $request->input('severity');
        $probabaility = $request->input('probabaility');
        $question_id = $request->input('question_id');
        $plan = $request->input('plan');
        $start_date = $request->input('start_date');
        $planned_completion_date = $request->input('planned_completion_date');
        $actual_completion_date = $request->input('actual_completion_date');
        $resolution = $request->input('resolution');
        $artifact = $request->input('artifact');

        $issue = RiskRegisterCst::where(['id' => $question_id, 'comp_id' => $comp_id])
            ->update([
                'poam' => true,
                'pseverity' => $severity,
                'pprobabaility' => $probabaility,
                'plan' => $plan,
                'start_date' => ($start_date != '' ? (Carbon::parse($start_date))->toDateTimeString() : null),
                'completion_date' => ($planned_completion_date != '' ? (Carbon::parse($planned_completion_date))->toDateTimeString() : null),
                'actual_compl_date' => ($actual_completion_date != '' ? (Carbon::parse($actual_completion_date))->toDateTimeString() : null),
                'resolution' => $resolution,
                'artifact' => $artifact,
                'prisk_rating' => ($severity > 0 && $probabaility > 0 ? $severity * $probabaility : null),
                'poam_updated_by' => $request->user()->id,
            ]);

        return response()->json(['issue' => RiskRegisterCst::where(['id' => $question_id, 'comp_id' => $comp_id])->first()], 200);
    }
}
