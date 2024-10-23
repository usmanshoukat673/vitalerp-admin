<?php

namespace App\Http\Controllers;

use App\Models\CompanyControlQuestion;
use App\Models\GlobalActivities;
use Illuminate\Http\Request;

class CompanyControlQuestionController extends Controller
{
    public function updateStatus(Request $request)
    {
        $this->validate($request, [
            'question_status' => 'required',
            'id' => 'required' // primary key of company controls questions 
        ]);

        $id = (int) $request->input('id');
        $question_status = $request->input('question_status');

        $company_control_question = CompanyControlQuestion::find($id);
        $company_control_question->status = $question_status;
        $company_control_question->save();
        return $company_control_question;
    }

    public function updateJustification(Request $request)
    {
        $this->validate($request, [
            'justification' => 'required',
            'id' => 'required' // primary key of company controls questions 
        ]);

        $id = (int) $request->input('id');
        $justification = $request->input('justification');

        $company_control_question = CompanyControlQuestion::find($id);
        $company_control_question->justification = $justification;
        $company_control_question->save();
        return $company_control_question;
    }
}
