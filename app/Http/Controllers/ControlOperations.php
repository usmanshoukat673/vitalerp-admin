<?php

namespace App\Http\Controllers;

use App\Http\Traits\DocumentsHelper;
use App\Models\CompCtrlDocs;
use App\Models\CompCtrls;
use App\Models\FileManager\Document;
use App\Models\GlobalActivities;
use App\Models\SectionDocuments;
use App\Services\PdfHtmlExtractor;
use App\Services\PdfScanner;
use Illuminate\Http\Request;

class ControlOperations extends Controller
{
    use DocumentsHelper;

    public function uploadArtifacts(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required|exists:documents,id',
            'comp_id' => 'required|exists:companies,id',
            'control_id' => 'required|exists:section_controls,id',
            'standard_section_id' => 'required|exists:standard_sections,id',
            'standard_id' => 'required|exists:standards,id',
            'file' => 'required|mimes:doc,docx,xls,xlsx,ppt,pptx,pdf,txt,rtf,odt,ods,odp,csv|max:25000', // max size in kilobytes
        ]);

        // TODO: make sure user has rights to upload files

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $document_id = $request->input('document_id');
        $control_id = $request->input('control_id');
        $standard_section_id = $request->input('standard_section_id');
        $standard_id = $request->input('standard_id');
        $name = $request->file('file')->getClientOriginalName();


        if ($this->hasFileNameTaken($document_id, $name, $comp_id)) {
            return response()->json(['errors' => [['file' => 'File with the given name already exists in the root of your files!']]], 422);
        }

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
            'section_id' => $standard_section_id,
            'control_id' => $control_id,
            'document_id' => $document->id,
            'page' => 'Compliance',
        ]);

        $this->setDirectories($comp_id);

        $document = Document::with('owner')->find($document->id);

        $request->file('file')->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);

        $control_artifact = CompCtrlDocs::create([
            'comp_id' => $comp_id,
            'document_id' => $document->id,
            'control_id' => $control_id,
            'section_id' => $standard_section_id,
            'standard_id' => $standard_id,
            'updated_by' => $user->id,
            'source' => 'uploaded'
        ]);

        SectionDocuments::create([
            'section_id' => $standard_section_id,
            'document_id' => $document->id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'assign_by' => $user->id,
        ]);

        if ($fileType === "pdf") {
            $this->pdfToDigital($document, $document_id, $standard_section_id, $control_id, $standard_id);
        }

        $section_documents = SectionDocuments::with('document.owner')
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at');
            }])
            ->where(['section_id' => $standard_section_id, 'comp_id' => $comp_id])->get();

        $artifacts = CompCtrlDocs::with('document')->where(['comp_id' => $comp_id, 'control_id' => $control_id, 'section_id' => $standard_section_id, 'standard_id' => $standard_id])->get();

        $control_artifact = CompCtrlDocs::with('document.owner')
            ->with(['control' => function ($q) {
                return $q->select('id', 'number');
            }])
            ->find($control_artifact->id);

        return response()->json([
            'message' => $document->name . ' uploaded successfully!',
            'document' => $document,
            'control_artifact' => $control_artifact,
            'section_documents' => $section_documents,
            'artifacts' => $artifacts
        ], 200);
    }

    private function pdfToDigital($document, $document_id, $standard_section_id, $control_id, $standard_id)
    {
        $user = request()->user();
        $filePath = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.' . $document->ext;

        $pdfScanner = new PdfScanner();
        $result = $pdfScanner->detectPdfContent($filePath);

        if ($result === 'text') {

            $pdfHtmlExtractor = new PdfHtmlExtractor();
            $htmlContent = $pdfHtmlExtractor->extractHtml($filePath);

            $document = Document::create([
                'name' => "DIGITAL_" . $document->name,
                'comp_id' => $document->comp_id,
                'parent' => $document_id,
                'type' => 'document',
                'created_by' => $user->id,
                'content' => $htmlContent,
                'size' => mb_strlen($htmlContent, '8bit')
            ]);

            CompCtrlDocs::create([
                'comp_id' => $document->comp_id,
                'document_id' => $document->id,
                'control_id' => $control_id,
                'section_id' => $standard_section_id,
                'standard_id' => $standard_id,
                'updated_by' => $user->id,
                'source' => 'converted'
            ]);

            SectionDocuments::create([
                'section_id' => $standard_section_id,
                'document_id' => $document->id,
                'comp_id' => $document->comp_id,
                'standard_id' => $standard_id,
                'assign_by' => $user->id,
            ]);

            GlobalActivities::create([
                'comp_id' => $document->comp_id,
                'user_id' => $user->id,
                'activity' => 'Uploaded',
                'event_type' => 'document',
                'standard_id' => $standard_id,
                'section_id' => $standard_section_id,
                'control_id' => $control_id,
                'document_id' => $document->id,
                'page' => 'Compliance',
            ]);
        }
    }

    public function compDocuments(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id'
        ]);

        $comp_id = $request->input('comp_id');

        $documents = Document::with(['owner'])
            ->where(['comp_id' => $comp_id])
            ->where(function ($q) {
                $q->where(['type' => 'file'])
                    ->orWhere(['type' => 'document']);
            })
            ->orderBy('name', 'asc')->get();

        return response()->json(['documents' => $documents], 200);
    }

    public function linkDocuments(Request $request)
    {
        $this->validate($request, [
            'documents' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'control_id' => 'required|exists:section_controls,id',
            'standard_section_id' => 'required|exists:standard_sections,id',
            'standard_id' => 'required|exists:standards,id',
        ], [
            'documents.required' => 'Please select document to link.'
        ]);

        $documents = (array) $request->input('documents');
        $comp_id = $request->input('comp_id');
        $control_id = $request->input('control_id');
        $standard_section_id = $request->input('standard_section_id');
        $standard_id = $request->input('standard_id');
        $user = $request->user();

        if (count($documents) > 0) {
            foreach ($documents as $document_id) {
                if (!CompCtrlDocs::where([
                    'comp_id' => $comp_id,
                    'document_id' => $document_id,
                    'control_id' => $control_id,
                    'section_id' => $standard_section_id,
                    'standard_id' => $standard_id,
                ])->first()) {
                    CompCtrlDocs::create([
                        'comp_id' => $comp_id,
                        'document_id' => $document_id,
                        'control_id' => $control_id,
                        'section_id' => $standard_section_id,
                        'standard_id' => $standard_id,
                        'updated_by' => $user->id,
                        'source' => 'linked'
                    ]);

                    GlobalActivities::create([
                        'comp_id' => $comp_id,
                        'user_id' => $user->id,
                        'activity' => 'Link',
                        'event_type' => 'document',
                        'standard_id' => $standard_id,
                        'section_id' => $standard_section_id,
                        'control_id' => $control_id,
                        'document_id' => $document_id,
                        'page' => 'Compliance',
                    ]);
                }

                if (!SectionDocuments::where([
                    'section_id' => $standard_section_id,
                    'document_id' => $document_id,
                    'comp_id' => $comp_id,
                    'standard_id' => $standard_id
                ])->first()) {
                    SectionDocuments::create([
                        'section_id' => $standard_section_id,
                        'document_id' => $document_id,
                        'comp_id' => $comp_id,
                        'standard_id' => $standard_id,
                        'assign_by' => $user->id,
                    ]);
                }
            }

            $section_documents = SectionDocuments::with('document.owner')
                ->with(['document' => function ($query) {
                    $query->select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at');
                }])
                ->where(['section_id' => $standard_section_id, 'comp_id' => $comp_id])->get();

            $artifacts = CompCtrlDocs::with('document.owner')
                ->with(['control' => function ($q) {
                    return $q->select('id', 'number');
                }])
                ->where(['comp_id' => $comp_id, 'control_id' => $control_id, 'section_id' => $standard_section_id, 'standard_id' => $standard_id])->get();

            return response()->json(['artifacts' => $artifacts, 'section_documents' => $section_documents], 200);
        }
    }

    public function createArtifact(Request $request)
    {
        $this->validate($request, [
            'content' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'control_id' => 'required|exists:section_controls,id',
            'section_id' => 'required',
            'standard_id' => 'required',
            'document_id' => 'required|exists:documents,id',
            'name' => 'required'
        ], [
            'content.required' => 'The document can not be blank.',
            'content.name' => 'The document name field is required.',
        ]);

        $user = $request->user();

        $name  = $request->input('name');
        $comp_id  = $request->input('comp_id');
        $content  = $request->input('content');
        $control_id  = $request->input('control_id');
        $section_id  = $request->input('section_id');
        $standard_id  = $request->input('standard_id');
        $document_id  = $request->input('document_id');

        if ($this->hasFileNameTaken($document_id, $name, $comp_id)) {
            return response()->json(['errors' => [['name' => 'Document with the given name already exists in the root of your files, please use different name.']]], 422);
        }

        $document = Document::create([
            'name' => $name,
            'comp_id' => $comp_id,
            'parent' => $document_id,
            'type' => 'document',
            'created_by' => $user->id,
            'content' => $content,
            'size' => mb_strlen($content, '8bit'),
            'modified' => now()->toDateTimeString()
        ]);

        $control_artifact = CompCtrlDocs::create([
            'comp_id' => $comp_id,
            'document_id' => $document->id,
            'control_id' => $control_id,
            'section_id' => $section_id,
            'standard_id' => $standard_id,
            'updated_by' => $user->id,
            'source' => 'created'
        ]);

        SectionDocuments::create([
            'section_id' => $section_id,
            'document_id' => $document->id,
            'comp_id' => $comp_id,
            'standard_id' => $standard_id,
            'assign_by' => $user->id,
        ]);

        GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => $user->id,
            'activity' => 'Created',
            'event_type' => 'document',
            'standard_id' => $standard_id,
            'section_id' => $section_id,
            'control_id' => $control_id,
            'document_id' => $document->id,
            'page' => 'Compliance',
        ]);

        $artifacts = CompCtrlDocs::with('document')->where(['comp_id' => $comp_id, 'control_id' => $control_id, 'section_id' => $section_id, 'standard_id' => $standard_id])->get();

        $section_documents = SectionDocuments::with('document.owner')
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at');
            }])
            ->where(['section_id' => $section_id, 'comp_id' => $comp_id])->get();


        $control_artifact = CompCtrlDocs::with('document.owner')
            ->with(['control' => function ($q) {
                return $q->select('id', 'number');
            }])
            ->find($control_artifact->id);

        return response()->json([
            'message' => $document->name . ' uploaded successfully!',
            'document' => $document,
            'control_artifact' => $control_artifact,
            'section_documents' => $section_documents,
            'artifacts' => $artifacts
        ], 200);
    }

    public function unassignDocument(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
        ]);

        // TODO: check wheter user is the owner of given document
        // TODO: make sure if it is a file
        $user = request()->user();

        try {
            $document = Document::find(decrypt($request->input('document_id')));
        } catch (\Throwable $th) {
            return response()->json(['errors' => [['document' => 'Invalid request']]], 422);
        }

        if ($document) {

            $comp_doc = CompCtrlDocs::where([
                'comp_id' => $document->comp_id,
                'document_id' => $document->id,
            ])->first();

            GlobalActivities::create([
                'comp_id' => $comp_doc->comp_id,
                'user_id' => $user->id,
                'activity' => 'Unlink',
                'event_type' => 'document',
                'standard_id' => $comp_doc->standard_id,
                'section_id' => $comp_doc->section_id,
                'control_id' => $comp_doc->control_id,
                'document_id' => $comp_doc->document_id,
                'page' => 'Compliance',
            ]);

            $comp_doc->delete();

            return response()->json(['Deleted'], 200);
        }

        return response()->json(['errors' => [['document' => 'File not found!']]], 422);
    }

    public function saveNotes(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'control_id' => 'required|exists:section_controls,id',
            'property_id' => 'required|exists:comp_ctrls,id',
            'note' => 'required'
        ]);

        $comp_id  = $request->input('comp_id');
        $control_id  = $request->input('control_id');
        $property_id  = $request->input('property_id');
        $note  = $request->input('note');

        $property = CompCtrls::where([
            'comp_id' => $comp_id,
            'control_id' => $control_id,
            'id' => $property_id,
        ])->first();

        if (!$property) {
            return response()->json(['not-found'], 404);
        }

        $property->notes = $note;
        $property->save();

        return response()->json(['property' => $property], 200);
    }
}
