<?php

namespace App\Http\Controllers;

use App\Http\Traits\DocumentsHelper;
use App\Http\Traits\SectionHelper;
use App\Models\CompCtrlDocs;
use App\Models\FileManager\Document;
use App\Models\GlobalActivities;
use App\Models\SectionDocuments;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class SectionController extends Controller
{
    private $control_documents, $sections, $user, $comp_id, $standard_id;

    use DocumentsHelper, SectionHelper;

    public function __construct()
    {
        $this->control_documents = new Collection();
        $this->sections = new Collection();
    }

    /**
     * Also know as A Custom document, A Artifact, a html data 
     */
    public function createDigDocument(Request $request)
    {
        $this->validate($request, [
            'content' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'section_id' => 'required',
            'standard_id' => 'required',
            'name' => 'required',
            'document_id' => 'required|exists:documents,id', // This is parent document directory 
        ], [
            'content.required' => 'The document can not be blank.',
            'name.required' => 'The Document Name is required.',
        ]);

        $user = $request->user();

        $this->user = $user;

        $name  = $request->input('name');
        $comp_id  = $request->input('comp_id');
        $content  = $request->input('content');
        $section_id  = $request->input('section_id');
        $standard_id  = $request->input('standard_id');
        $document_id  = $request->input('document_id');

        $this->comp_id = $comp_id;
        $this->standard_id = $standard_id;

        if ($this->hasFileNameTaken($document_id, $name, $comp_id)) {
            return response()->json(['errors' => [['document_name' => 'Document with the given name already exists in the root of your files, please use different name.']]], 422);
        }

        $document = Document::create([
            'name' => $name,
            'comp_id' => $comp_id,
            'parent' => $document_id,
            'type' => 'document',
            'created_by' => $user->id,
            'content' => $content,
            'size' => mb_strlen($content, '8bit')
        ]);

        $this->sections = $this->getSubSections($standard_id, $section_id);
        $this->assignDocument($document);

        GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => $user->id,
            'activity' => 'Created',
            'event_type' => 'document',
            'standard_id' => $standard_id,
            'section_id' => $section_id,
            'document_id' => $document->id,
            'page' => 'Compliance',
        ]);

        return response()->json([
            'message' => $document->name . ' created successfully!',
            'section_documents' => $this->getSectionDocuments()
        ], 200);
    }


    public function uploadDocument(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required|exists:documents,id',
            'comp_id' => 'required|exists:companies,id',
            'section_id' => 'required|exists:standard_sections,id',
            'standard_id' => 'required|exists:standards,id',
            'file' => 'required|mimes:doc,docx,xls,xlsx,ppt,pptx,pdf,txt,rtf,odt,ods,odp,csv|max:25000', // max size in kilobytes
        ]);

        // TODO: make sure user has rights to upload files
        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $document_id = $request->input('document_id');
        $section_id = $request->input('section_id');
        $standard_id = $request->input('standard_id');
        $name = $request->file('file')->getClientOriginalName();

        $this->user = $user;
        $this->comp_id = $comp_id;
        $this->standard_id = $standard_id;

        if ($this->hasFileNameTaken($document_id, $name, $comp_id)) {
            return response()->json(['errors' => [['file' => 'File with the given name already exists in the root of your files!']]], 422);
        }

        $document = Document::create([
            'name' => $name,
            'size'       => $request->file('file')->getSize(),
            'ext'        => strtolower($request->file('file')->getClientOriginalExtension()),
            'comp_id' => $comp_id,
            'parent' => $document_id,
            'type' => 'file',
            'created_by' => $user->id
        ]);

        $this->sections = $this->getSubSections($this->standard_id, $section_id);
        $this->assignDocument($document);

        GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => $user->id,
            'activity' => 'Uploaded',
            'event_type' => 'document',
            'standard_id' => $standard_id,
            'section_id' => $section_id,
            'document_id' => $document->id,
            'page' => 'Compliance',
        ]);

        $this->setDirectories($comp_id);

        $document = Document::with('owner')->find($document->id);

        $request->file('file')->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);

        return response()->json([
            'message' => $document->name . ' uploaded successfully!',
            'section_documents' => $this->getSectionDocuments()
        ], 200);
    }

    private function getSectionDocuments()
    {
        $filtered_sections = $this->sections->map(function ($sec) {
            return $sec->id;
        });

        $this->control_documents = CompCtrlDocs::select('id', 'comp_id', 'document_id', 'control_id', 'section_id', 'standard_id', 'updated_by', 'created_at', 'updated_at')
            ->with(['control' => function ($query) {
                $query->select('id', 'name', 'number', 'short_name');
            }])
            ->with(['document.controls.control' => function ($query) {
                $query->select('id', 'number');
            }])
            ->with(['document' => function ($query) {
                $query->select('id', 'name', 'ext', 'updated_at', 'created_at', 'type', 'created_by', 'review_at', 'next_review_at')->with('owner');
            }])
            ->where([
                'comp_id' => $this->comp_id,
                'standard_id' => $this->standard_id
            ])
            ->whereIn('section_id', $filtered_sections->values())
            ->get();

        $docs_collection = new Collection();
        return $this->getUniqueDocuments($docs_collection);
    }

    private function assignDocument($document)
    {
        if (count($this->sections) > 0) {
            foreach ($this->sections as $section) {
                SectionDocuments::create([
                    'section_id' => $section->id,
                    'document_id' => $document->id,
                    'comp_id' => $this->comp_id,
                    'standard_id' => $this->standard_id,
                    'assign_by' => $this->user->id,
                ]);

                $controls = $this->getSectionControls($this->standard_id, $section->id);

                if (count($controls) > 0) {
                    foreach ($controls as $control) {
                        CompCtrlDocs::create([
                            'comp_id' => $this->comp_id,
                            'document_id' => $document->id,
                            'control_id' => $control->id,
                            'section_id' => $section->id,
                            'standard_id' => $this->standard_id,
                            'updated_by' => $this->user->id,
                            'source' => 'linked'
                        ]);
                    }
                }
            }
        }
    }
}
