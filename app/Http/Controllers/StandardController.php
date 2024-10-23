<?php

namespace App\Http\Controllers;

use App\Http\Traits\DocumentsHelper;
use App\Models\CompCtrlDocs;
use App\Models\CompCtrls;
use App\Models\CompStandards;
use App\Models\CompStdDocs;
use App\Models\FileManager\Document;
use App\Models\GlobalActivities;
use Illuminate\Http\Request;

class StandardController extends Controller
{
    use DocumentsHelper;

    public function uploadArtifacts(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required|exists:documents,id',
            'comp_id' => 'required|exists:companies,id',
            'standard_id' => 'required|exists:standards,id',
            'file' => 'required|mimes:doc,docx,xls,xlsx,ppt,pptx,pdf,txt,rtf,odt,ods,odp,csv|max:25000', // max size in kilobytes
        ]);

        // TODO: make sure user has rights to upload files
        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $document_id = $request->input('document_id');
        $standard_id = $request->input('standard_id');
        $name = $request->file('file')->getClientOriginalName();


        // if ($this->hasFileNameTaken($document_id, $name, $comp_id)) {
        //     return response()->json(['errors' => [['file' => 'File with the given name already exists in the root of your files!']]], 422);
        // }

        $fileType = strtolower($request->file('file')->getClientOriginalExtension());

        $document = Document::create([
            'name' => $name,
            'size'       => $request->file('file')->getSize(),
            'ext'        => $fileType,
            'comp_id' => $comp_id,
            'parent' => $document_id,
            'type' => 'file',
            'created_by' => $user->id
        ]);

        GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => $user->id,
            'activity' => 'Uploaded',
            'event_type' => 'document',
            'standard_id' => $standard_id,
            'document_id' => $document->id,
            'page' => 'Compliance',
        ]);

        $this->setDirectories($comp_id);

        $document = Document::with('owner')->find($document->id);

        $request->file('file')->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);

        $standard_document = CompStdDocs::create([
            'comp_id' => $comp_id,
            'document_id' => $document->id,
            'standard_id' => $standard_id,
            'uploaded_by' => $user->id,
        ]);

        $standard_documents = CompStdDocs::with('document.owner')
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at');
            }])
            ->where(['standard_id' => $standard_id, 'comp_id' => $comp_id])
            ->get();

        return response()->json([
            'message' => $document->name . ' uploaded successfully!',
            'document' => $document,
            'standard_document' => $standard_document,
            'standard_documents' => $standard_documents,
        ], 200);
    }

    public function standardInfo(Request $request)
    {
        $this->validate($request, [
            'standard_id' => 'required',
        ]);

        $comp_id = $request->input('comp_id');
        $standard_id = $request->input('standard_id');

        $assigned_standards = CompStandards::where([
            'comp_id' => $comp_id,
        ])->pluck('standard_id')->toArray();

        $company_standard = CompStandards::where([
            'comp_id' => $comp_id,
            'standard_id' => $standard_id
        ])->first();

        $standard_controls = CompCtrls::with(['control' => function ($q)  use ($assigned_standards) {
            $q->select('id', 'number', 'name', 'baseline_privacy', 'maturity_level')
                ->with(['mapped.control' => function ($q) use ($assigned_standards) {
                    $q->select('id', 'standard_section_id', 'standard_id')
                        ->with(['standard' => function ($q) {
                            $q->select('id');
                        }])
                        ->whereIn('standard_id', $assigned_standards);
                }])
                ->with('baseline_priorities');
        }])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->get();
            
        $standard_controls = $this->filterControlsBaseonPriority($standard_controls, $company_standard);

        $mapped_to_control_ids = $this->getMappedToIdsFromDomainControls($standard_controls);

        $control_mappings =  $this->getMappedControls($mapped_to_control_ids, $comp_id);

        $company_control_ids = $this->pluckControlIds($standard_controls);

        $standard_documents = CompCtrlDocs::with('document.docowner')
            ->with(['control' => function ($q) {
                return $q->select('id', 'number');
            }])
            ->where([
                'comp_id' => $comp_id,
            ])
            ->whereIn('control_id',  array_merge($company_control_ids, $mapped_to_control_ids))
            ->get();

        $standard_documents = $this->groupDocuments($standard_documents);

        list($applicable, $not_applicable, $partially_imple, $implemented, $excluded_ctrls) = $this->getDomainChartInfo($comp_id, $standard_id);

        return response([
            'standard_info' => [
                'control_count' => count($standard_controls),
                'documents_count' => count($standard_documents),
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'excluded_ctrls' => $excluded_ctrls
            ],
            'standard_documents' => $standard_documents,
            'standard_controls' => $standard_controls,
            'control_mappings' => $control_mappings,
            'standard_activities' => $request->user()->globalActivities()
                ->with(['user', 'control', 'section', 'document', 'standard'])
                ->where(['comp_id' => $comp_id, 'standard_id' => $standard_id])
                ->latest()
                ->get()
        ], 200);
    }

    private function getDomainChartInfo(int $comp_id, int $standard_id)
    {
        $applicable = CompCtrls::where(['applicable' => 'Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();


        $not_applicable = CompCtrls::where(['applicable' => 'Not Applicable', 'status' => 'Not Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $partially_imple = CompCtrls::where(['status' => 'Partially Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $implemented = CompCtrls::where(['status' => 'Implemented'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        $excluded = CompCtrls::where(['applicable' => 'Excluded'])
            ->where([
                'comp_id' => $comp_id,
                'standard_id' => $standard_id
            ])
            ->count();

        return [$applicable, $not_applicable, $partially_imple, $implemented, $excluded];
    }
}
