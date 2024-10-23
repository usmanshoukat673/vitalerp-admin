<?php

namespace App\Http\Traits;

use App\Models\CompanySection;
use App\Models\CompCtrls;
use App\Models\CustodianSection;
use App\Models\QuestionControls;
use App\Models\RiskRegisterStd;
use App\Models\SectionControl;
use App\Models\StandardSection;
use App\Models\UserSection;

trait StandardManager{

    protected function assignQuestions($comp_id, $standard_id)
    {
        $questions = QuestionControls::leftJoin('section_controls', 'question_controls.control_id', '=', 'section_controls.id')
            ->where(['section_controls.standard_id' => $standard_id])
            ->get();

        if (count($questions) > 0) {
            foreach ($questions as $question) {
                $data = ['question_id' => $question->question_id, 'comp_id' => $comp_id, 'control_id' => $question->control_id, 'section_id' => $question->standard_section_id, 'standard_id' => $question->standard_id];
                if (!RiskRegisterStd::where($data)->first()) {
                    RiskRegisterStd::create($data);
                }
            }
        }
    }

    protected function assignControls($comp_id, $standard_id)
    {
        $controls = SectionControl::where(['standard_id' => $standard_id])
            ->get();

        if (count($controls) > 0) {
            foreach ($controls as $control) {
                $data = ['comp_id' => $comp_id, 'control_id' => $control->id, 'section_id' => $control->standard_section_id, 'standard_id' => $control->standard_id, 'maturity_level' => $control->maturity_level];
                if (!CompCtrls::where($data)->first()) {
                    CompCtrls::create($data);
                }
            }
        }
    }

    protected function assignUserSection($user_id, $comp_id, $standard_id)
    {
        $sections = StandardSection::select('id', 'parent', 'standard_id')->where(['standard_id' => $standard_id])->get();
        if (count($sections) > 0) {
            foreach ($sections as $section) {
                if (!UserSection::where(['standard_id' => $standard_id, 'section_id' => $section->id, 'comp_id' => $comp_id, 'user_id' => $user_id])->first()) {
                    UserSection::create(['standard_id' => $standard_id, 'section_id' => $section->id, 'comp_id' => $comp_id, 'user_id' => $user_id, 'parent' => $section->parent])->first();
                }
            }
        }
    }

    protected function assignCustodianSection($user_id, $comp_id, $standard_id)
    {
        $sections = StandardSection::select('id', 'parent', 'standard_id')->where(['standard_id' => $standard_id])->get();
        if (count($sections) > 0) {
            foreach ($sections as $section) {
                if (!CustodianSection::where(['standard_id' => $standard_id, 'section_id' => $section->id, 'comp_id' => $comp_id, 'user_id' => $user_id])->first()) {
                    CustodianSection::create(['standard_id' => $standard_id, 'section_id' => $section->id, 'comp_id' => $comp_id, 'user_id' => $user_id, 'parent' => $section->parent])->first();
                }
            }
        }
    }

    protected function assignCompanySection($comp_id, $standard_id)
    {
        $sections = StandardSection::select('id', 'parent', 'standard_id')->where(['standard_id' => $standard_id])->get();
        if (count($sections) > 0) {
            foreach ($sections as $section) {
                if (!CompanySection::where(['standard_id' => $standard_id, 'section_id' => $section->id, 'comp_id' => $comp_id])->first()) {
                    CompanySection::create(['standard_id' => $standard_id, 'section_id' => $section->id, 'comp_id' => $comp_id, 'parent' => $section->parent])->first();
                }
            }
        }
    }
}