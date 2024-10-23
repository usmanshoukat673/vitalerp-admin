<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\CompanyControlQuestion;
use App\Models\CompCtrlDocs;
use App\Models\CompCtrls;
use App\Models\CompStandards;
use App\Models\ControlQuestionMap;
use App\Models\SectionControl;
use Illuminate\Http\Request;

class ControlController extends Controller
{
    public function info(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
            'id' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');
        $id = (int) $request->input('id');

        // $control_documents = CompCtrlDocs::with('document.docowner')
        //     ->with(['control' => function ($q) {
        //         return $q->select('id', 'number');
        //     }])
        //     ->where([
        //         'comp_id' => $comp_id,
        //         'standard_id' => $standard_id,
        //         'control_id' => $id
        //     ])
        //     ->get();

        //TODO - this is for now we need to shift this function call at the time of standard assignment 
        $this->syncCompanyControlQuestions($comp_id, $id);

        $assigned_standards = CompStandards::where([
            'comp_id' => $comp_id,
        ])->pluck('standard_id')->toArray();

        $control = CompCtrls::with(['control' => function ($q)  use ($assigned_standards) {
            return $q->select('id', 'number', 'name', 'baseline_privacy', 'maturity_level', 'description', 'additional_info')
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
                'standard_id' => $standard_id,
                'control_id' => $id
            ])
            ->first();

        $mapped_to_control_ids = $this->getMappedToIds($control->control->mapped);

        $control_mappings =  $this->getMappedControls($mapped_to_control_ids, $comp_id);

        $control_questions = CompanyControlQuestion::select('id', 'control_id', 'question_id', 'section_id', 'standard_id', 'status', 'justification')
            ->with(['question' => function ($q) {
                $q->select('id', 'name', 'source', 'required');
            }])
            ->where(['control_id' => $id, 'comp_id' => $comp_id])
            ->get();

        // Sort the collection by the 'required' attribute of the related 'question'
        $sorted_control_questions = $control_questions->sortByDesc(function ($controlQuestion) {
            return $controlQuestion->question->required;
        });

        // If you need an array, you can convert the collection to an array
        $sorted_control_questions = $sorted_control_questions->values()->all();

        array_push($mapped_to_control_ids, $id);

        $control_documents = CompCtrlDocs::with('document.docowner')
            ->with(['control' => function ($q) {
                return $q->select('id', 'number');
            }])
            ->where([
                'comp_id' => $comp_id,
            ])->whereIn('control_id', $mapped_to_control_ids)
            ->get();

        return response([
            'control_info' => [
                'documents_count' => count($control_documents),
                'control' => $control,
                'assigned_users' => $this->getAssignment($comp_id, $id),
                'deligated_users' => $this->getDeligation($comp_id, $id)
            ],
            'control_documents' => $control_documents,
            'control_mappings' =>  $control_mappings,
            'control_activities' => $request->user()->globalActivities()
                ->with(['user', 'control', 'section', 'document'])
                ->where(['comp_id' => $comp_id, 'standard_id' => $standard_id, 'control_id' => $id])
                ->latest()
                ->get(),
            'control_questions' => $sorted_control_questions,
        ], 200);
    }

    /**
     * A description of the entire PHP function.
     *
     * @param int $compId description
     * @param int $controlId description
     * @return array
     */
    private function getAssignment(int $compId, int $controlId): array
    {
        $assignment = Assignment::with(['users' => function ($query) {
            $query->select('assignment_id', 'user_id');
        }])->where([
            'comp_id' => $compId,
            'control_id' => $controlId
        ])->first();

        // Check if the assignment exists
        if (!$assignment) {
            return [];
        }

        // Check if the assignment has users
        if (!$assignment->users) {
            return [];
        }

        $user_ids = $assignment->users->pluck('user_id')->toArray();

        return $user_ids;
    }

    /**
     * Retrieves the user IDs of the users who are delegated to a specific control in a given company.
     *
     * @param int $compId The ID of the company.
     * @param int $controlId The ID of the control.
     * @return array The array of user IDs.
     */
    private function getDeligation(int $compId, int $controlId)
    {
        $assignment = Assignment::with(['deligation.users'])->where([
            'comp_id' => $compId,
            'control_id' => $controlId
        ])->first();

        if (!$assignment || !$assignment->deligation || !$assignment->deligation->users) {
            return [];
        }

        $user_ids = $assignment->deligation->users->pluck('user_id')->toArray();

        return $user_ids;
    }

    private function syncCompanyControlQuestions($comp_id, $control_id)
    {
        $control = SectionControl::select('id', 'standard_section_id', 'standard_id')->find($control_id);

        $control_questions = ControlQuestionMap::select('control_id', 'question_id')->with('question')->where(['control_id' => $control_id])->get();

        if ($control && count($control_questions) > 0) {
            foreach ($control_questions as $control_question) {
                if (!CompanyControlQuestion::where(['comp_id' => $comp_id, 'control_id' => $control_id, 'question_id' => $control_question->question_id, 'section_id' => $control->standard_section_id, 'standard_id' => $control->standard_id])->first() && $control_question->question != null) {
                    CompanyControlQuestion::create(['comp_id' => $comp_id, 'control_id' => $control_id, 'question_id' => $control_question->question_id, 'section_id' => $control->standard_section_id, 'standard_id' => $control->standard_id]);
                }
            }
        }
    }
}
