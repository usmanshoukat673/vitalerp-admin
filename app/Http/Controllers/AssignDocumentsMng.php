<?php

namespace App\Http\Controllers;

use App\Models\CompCtrlDocs;
use App\Models\CompStandards;
use App\Models\FileManager\Document;
use App\Models\FunctionSections;
use App\Models\GlobalActivities;
use App\Models\SectionControl;
use App\Models\SectionDocuments;
use App\Models\Standard;
use App\Models\StandardSection;
use Illuminate\Http\Request;

class AssignDocumentsMng extends Controller
{
    /**
     * Get All Section to Assign & existing sections for the given document
     *
     * @param [type] $document_id
     * @return [array|json] $sections, $document_sections
     */
    public function sections($comp_id, $document_id)
    {
        if (!$document_id) {
            abort(404);
        }

        $document_id = decrypt($document_id);

        $document = Document::find($document_id);

        $document_sections = SectionDocuments::select('section_id')->where(['document_id' => $document->id, 'comp_id' => $document->comp_id])->get();

        $standards = $this->__standards($comp_id);

        $sections = StandardSection::with(['standard' => function ($query) {
            $query->select('id', 'name', 'expand_name');
        }])
            ->where('parent', '!=', null)
            ->whereIn('standard_id', $standards)
            ->select('id', 'menu_name', 'standard_id')
            ->orderBy('menu_name', 'asc')
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['sections' => $sections, 'document_sections' => $document_sections], 200);
        }

        return ['sections' => $sections, 'document_sections' => $document_sections];
    }

    /**
     * Get All controls to Assign & existing controls for the given document
     *
     * @param [type] $document_id
     * @return [array|json] $sections, $document_sections
     */
    public function controls($comp_id, $document_id)
    {
        if (!$document_id) {
            abort(404);
        }

        $document_id = decrypt($document_id);

        $document = Document::find($document_id);

        $document_controls = CompCtrlDocs::select('control_id')->where(['document_id' => $document->id, 'comp_id' => $document->comp_id])->get();

        $standards = $this->__standards($comp_id);

        $controls = SectionControl::with(['standard' => function ($query) {
            $query->select('id', 'name', 'expand_name');
        }])
            ->whereIn('standard_id', $standards)
            ->select('id', 'number', 'standard_id', 'name')
            ->orderBy('name', 'asc')
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['controls' => $controls, 'document_controls' => $document_controls], 200);
        }

        return ['controls' => $controls, 'document_controls' => $document_controls];
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

    public function plainSections($comp_id)
    {
        $standards = $this->__standards($comp_id);
        $sections = StandardSection::with(['standard' => function ($query) {
            $query->select('id', 'name', 'expand_name');
        }])
            ->whereIn('standard_id', $standards)->where('parent', '!=', null)->select('id', 'menu_name', 'standard_id')->orderBy('menu_name', 'asc')->get();

        if (request()->wantsJson()) {
            return response()->json(['sections' => $sections], 200);
        }

        return ['sections' => $sections];
    }

    /**
     * Assign sections to the given document
     *
     * @param Request $request
     * @return [json|array] $document_sections
     */
    public function assign(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'sections' => 'required',
        ]);

        $sections = request('sections');
        $document_id = decrypt(request('document_id'));
        $comp_id = request('comp_id');

        $user = $request->user();

        SectionDocuments::where(['document_id' => $document_id, 'comp_id' => $comp_id])->delete();

        $sections = StandardSection::whereIn('id', $sections)->get();

        if (count($sections) > 0) {
            foreach ($sections as $section) {
                SectionDocuments::create(['section_id' => $section->id, 'document_id' => $document_id, 'comp_id' => $comp_id, 'standard_id' => $section->standard_id, 'assign_by' => $user->id]);
            }
        }

        $document_sections = SectionDocuments::select('section_id')->where(['document_id' => $document_id, 'comp_id' => $comp_id])->get();

        if (request()->wantsJson()) {
            return response()->json(['document_sections' => $document_sections], 200);
        }

        return ['document_sections' => $document_sections];
    }

    /**
     * Assign controls to the given document
     *
     * @param Request $request
     * @return [json|array] $document_sections
     */
    public function assignControls(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'controls' => 'required',
        ]);

        $controls = request('controls');
        $document_id = decrypt(request('document_id'));
        $comp_id = request('comp_id');

        $user = $request->user();

        CompCtrlDocs::where(['document_id' => $document_id, 'comp_id' => $comp_id])->delete();

        $controls = SectionControl::whereIn('id', $controls)->get();

        if (count($controls) > 0) {
            foreach ($controls as $control) {
                CompCtrlDocs::create(['control_id' => $control->id, 'section_id' => $control->standard_section_id, 'document_id' => $document_id, 'comp_id' => $comp_id, 'standard_id' => $control->standard_id, 'updated_by' => $user->id]);

                if (!GlobalActivities::where([
                    'comp_id' => $comp_id,
                    'activity' => 'Assign',
                    'event_type' => 'document',
                    'standard_id' => $control->standard_id,
                    'section_id' => $control->standard_section_id,
                    'control_id' => $control->id,
                    'document_id' => $document_id
                ])->first())
                    GlobalActivities::create([
                        'comp_id' => $comp_id,
                        'user_id' => $user->id,
                        'activity' => 'Assign',
                        'event_type' => 'document',
                        'standard_id' => $control->standard_id,
                        'section_id' => $control->standard_section_id,
                        'control_id' => $control->id,
                        'document_id' => $document_id,
                        'page' => 'Compliance',
                    ]);
            }
        }

        $document_controls = CompCtrlDocs::select('control_id')->where(['document_id' => $document_id, 'comp_id' => $comp_id])->get();

        if (request()->wantsJson()) {
            return response()->json(['document_controls' => $document_controls], 200);
        }

        return ['document_controls' => $document_controls];
    }
}
