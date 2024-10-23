<?php

namespace App\Http\Controllers;

use App\Http\Traits\DocumentsHelper;
use App\Models\CompCtrlDocs;
use App\Models\CompCtrls;
use App\Models\FileManager\Document;
use App\Models\GlobalActivities;
use App\Models\SectionDocuments;
use App\Models\StandardSection;
use App\Models\TaskDocuments;
use App\Models\ThirdPartyCustodianSections;
use App\Models\ThirdPartyOwnerSections;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class FileManager extends Controller
{
    use DocumentsHelper;

    /**
     * List files and folder from the given directory
     *
     * @param [type] $comp_id
     * @param [type] $document_id
     * @return void
     */
    public function list($comp_id, $document_id)
    {

        if (!$comp_id || !$document_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $document_id = decrypt($document_id);

        $date = Carbon::now();

        $date = $date->subDays(120);

        $documents = Document::select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at')
            ->with(['owner'])->where(['comp_id' => $comp_id, 'parent' => $document_id])
            ->orderBy('type', 'asc')->get();

        $document = Document::with('parent_folder', 'owner')->find($document_id);
        $breadcrumbs = new Collection();

        if (request()->wantsJson()) {
            return response()->json(['documents' => $documents, 'document' => $document, 'breadcrumbs' => $this->Breadcrumb($document, $breadcrumbs)], 200);
        }

        return $documents;
    }

    /**
     * List files and folder from the given directory
     *
     * @param [type] $comp_id
     * @param [type] $document_id
     * @return void
     */
    public function defaultAccess($comp_id, $document_id)
    {

        if (!$comp_id || !$document_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $document_id = decrypt($document_id);

        $date = Carbon::now();

        $date = $date->subDays(120);

        $resent_docs =  Document::select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at')
            ->with(['owner'])->where(['comp_id' => $comp_id, 'parent' => $document_id])
            ->where('updated_at', '>=', $date->toDateTimeString())
            ->whereIn('type', ['document', 'file'])
            ->orderBy('type', 'asc')
            ->limit(20)
            ->get();

        $from_date = (Carbon::now())->subDays(90)->toDateTimeString();

        $sections = new Collection();

        $ctrl_property_sections = CompCtrls::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id])
            ->where('updated_at', '>=', $from_date)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = $this->_filtered_sections($sections, $ctrl_property_sections);

        $ctrl_doc_sections = CompCtrlDocs::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id])
            ->where('updated_at', '>=', $from_date)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = $this->_filtered_sections($sections, $ctrl_doc_sections);


        $owners = ThirdPartyOwnerSections::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id, 'enable' => 1])
            ->where('updated_at', '>=', $from_date)
            ->where('parent', '!=', null)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = $this->_filtered_sections($sections, $owners);

        $custodians = ThirdPartyCustodianSections::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id, 'enable' => 1])
            ->where('updated_at', '>=', $from_date)
            ->where('parent', '!=', null)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = (($this->_filtered_sections($sections, $custodians))->unique())->take(7);

        $sub_sections = StandardSection::with(['standard' => function ($query) {
            $query->select('id', 'name');
        }])
            ->whereIn('id', $sections)
            ->where('parent', '!=', null)
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['resent_docs' => $resent_docs, 'sub_sections' => $sub_sections], 200);
        }

        return response()->json(['resent_docs' => $resent_docs, 'sub_sections' => $sub_sections], 200);
    }
    /**
     * List files and folder from the given directory
     *
     * @param [type] $comp_id
     * @param [type] $document_id
     * @return void
     */
    public function quickAccess($comp_id)
    {

        if (!$comp_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $from_date = (Carbon::now())->subDays(90)->toDateTimeString();

        $sections = new Collection();

        $ctrl_property_sections = CompCtrls::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id])
            ->where('updated_at', '>=', $from_date)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = $this->_filtered_sections($sections, $ctrl_property_sections);

        $ctrl_doc_sections = CompCtrlDocs::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id])
            ->where('updated_at', '>=', $from_date)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = $this->_filtered_sections($sections, $ctrl_doc_sections);


        $owners = ThirdPartyOwnerSections::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id, 'enable' => 1])
            ->where('updated_at', '>=', $from_date)
            ->where('parent', '!=', null)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = $this->_filtered_sections($sections, $owners);

        $custodians = ThirdPartyCustodianSections::select('section_id', 'updated_at')
            ->where(['comp_id' => $comp_id, 'enable' => 1])
            ->where('updated_at', '>=', $from_date)
            ->where('parent', '!=', null)
            ->distinct()
            ->orderby('updated_at', 'desc')
            ->limit(7)
            ->get();

        $sections = (($this->_filtered_sections($sections, $custodians))->unique())->take(7);

        $sub_sections = StandardSection::with(['standard' => function ($query) {
            $query->select('id', 'name');
        }])
            ->whereIn('id', $sections)
            ->where('parent', '!=', null)
            ->get();

        if (request()->wantsJson()) {
            return response()->json(['sub_sections' => $sub_sections], 200);
        }

        return response()->json(['sub_sections' => $sub_sections], 200);
    }

    public function recentDocs($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $user = request()->user();

        $date = Carbon::now();

        $date = $date->subDays(120);

        $resent_docs =  Document::select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at')
            ->with(['owner'])->where(['comp_id' => $comp_id])
            ->where('updated_at', '>=', $date->toDateTimeString())
            ->whereIn('type', ['document', 'file'])
            ->orderBy('type', 'desc')
            ->limit(20)
            ->get();

        return response()->json(['resent_docs' => $resent_docs], 200);
    }

    public function sectionDocs($comp_id, $section_id)
    {
        if (!$comp_id || !$section_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $section_docs = SectionDocuments::select('document_id')
            ->where(['comp_id' => $comp_id, 'section_id' => $section_id])
            ->distinct()
            ->get();

        $section_docs = $section_docs->map(function ($section) {
            return $section->document_id;
        });

        $documents =  Document::select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified', 'doc_ref', 'created_by', 'updated_by', 'created_at', 'updated_at')
            ->with(['owner'])->where(['comp_id' => $comp_id])
            ->whereIn('id', $section_docs)
            ->orderBy('type', 'desc')
            ->limit(20)
            ->get();

        $section = StandardSection::select('id', 'name', 'menu_name')->find($section_id);

        return response()->json(['documents' => $documents, 'section' => $section], 200);
    }

    // in process not in use right now
    public function deletedFiles($comp_id)
    {
        if (!$comp_id) {
            abort(404);
        }

        // TODO: needs to make sure wheter this perticular users has the rights to featch data from company

        $section_docs = SectionDocuments::with('document.owner')
            ->where(['comp_id' => $comp_id, 'section_id' => $section_id])
            ->get();

        return response()->json(['section_docs' => $section_docs, 'section' => $section], 200);
    }

    public function _filtered_sections($existing_collection, $sections)
    {
        if (count($sections) > 0) {

            $sections->each(function ($section, $key) use ($existing_collection) {
                $existing_collection->push($section->section_id);
            });
        }

        return $existing_collection;
    }

    public function Breadcrumb($document, $breadcrumbs)
    {
        $breadcrumbs->push($document->parent_folder);
        if ($document->parent != 0) {
            if ($document->parent_folder->parent != 0) {
                $document = Document::with('parent_folder')->find($document->parent_folder->parent);
                $breadcrumbs->push($document);
                if ($document->parent != 0) {
                    return $this->Breadcrumb($document, $breadcrumbs);
                }
            }
        }

        return $breadcrumbs;
    }

    /**
     * Create new folder in given directory
     *
     * @param Request $request
     * @return void || Errors || $document
     */
    public function createFolder(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'folder_name' => 'required|max:255',
        ]);

        $document_id = decrypt($request->input('document_id'));

        if ($this->hasNameTaken($document_id, $request)) {
            return response()->json(['errors' => [['folder_name' => 'Folder with the given name already exists in the current directory!']]], 422);
        }

        $user = request()->user();

        $document = Document::create(['name' => $request->input('folder_name'), 'comp_id' => $request->input('comp_id'), 'parent' => $document_id, 'type' => 'folder', 'created_by' => $user->id]);

        $document = Document::with('owner')->find($document->id);

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    /**
     * Create new digital document in given directory
     *
     * @param Request $request
     * @return void || Errors || $document
     */
    public function createDocument(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'document_name' => 'required|max:255',
        ]);

        $document_id = decrypt($request->input('document_id'));

        if ($this->hasDocNameTaken($document_id, $request)) {
            return response()->json(['errors' => [['document_name' => 'Document with the given name already exists in the current directory!']]], 422);
        }

        $user = request()->user();

        $document = Document::create(['name' => $request->input('document_name'), 'comp_id' => $request->input('comp_id'), 'parent' => $document_id, 'type' => 'document', 'created_by' => $user->id]);

        $document = Document::with('owner')->find($document->id);

        $this->storeGlobalActivity($document, 'Created');

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    public function createDocumentCD(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'document_name' => 'required|max:255',
        ]);

        $document_id = decrypt($request->input('document_id'));
        $sections = request('sections');
        $comp_id = request('comp_id');

        if ($this->hasDocNameTaken($document_id, $request)) {
            return response()->json(['errors' => [['document_name' => 'Document with the given name already exists in the current directory!']]], 422);
        }

        $user = request()->user();

        $document = Document::create(['name' => $request->input('document_name'), 'comp_id' => $request->input('comp_id'), 'parent' => $document_id, 'type' => 'document', 'created_by' => $user->id, 'content' => $request->input('content')]);

        $document = Document::with('owner')->find($document->id);

        $this->storeGlobalActivity($document, 'Created');

        // assign sections
        $sections = StandardSection::whereIn('id', $sections)->get();

        if (count($sections) > 0) {
            foreach ($sections as $section) {
                SectionDocuments::create(['section_id' => $section->id, 'document_id' => $document->id, 'comp_id' => $comp_id, 'standard_id' => $section->standard_id, 'assign_by' => $user->id]);
            }
        }

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    /**
     * Check wheter given folder is exists in the current directory
     *
     * @param [type] $document_id
     * @param [type] $request
     * @return boolean
     */
    public function hasNameTaken($document_id, $request)
    {
        return  Document::where(['name' => $request->input('folder_name'), 'comp_id' => $request->input('comp_id'), 'parent' => $document_id, 'type' => 'folder'])->first();
    }

    /**
     * Check wheter given Document is exists in the current directory
     *
     * @param [type] $document_id
     * @param [type] $request
     * @return boolean
     */
    public function hasDocNameTaken($document_id, $request)
    {
        return  Document::where(['name' => $request->input('document_name'), 'comp_id' => $request->input('comp_id'), 'parent' => $document_id, 'type' => 'document'])->first();
    }

    public function hasNameTakenOnUpdate($document, $name, $comp_id, $type = 'folder')
    {
        return  Document::where([
            'name' => $name,
            'comp_id' => $comp_id,
            'parent' => $document->parent,
            'type' => $type
        ])
            ->where('id', '!=', $document->id)
            ->first();
    }

    public function hasFileNameTakenOnUpdate($document, $name, $comp_id, $ext, $type = 'file')
    {
        return  Document::where([
            'name' => $name,
            'comp_id' => $comp_id,
            'parent' => $document->parent,
            'type' => $type,
            'ext' => $ext,
        ])
            ->where('id', '!=', $document->id)
            ->first();
    }

    public function hasDocNameTakenOnUpdate($document, $request)
    {
        return  Document::where([
            'name' => $request->input('document_name'),
            'comp_id' => $request->input('comp_id'),
            'parent' => $document->parent,
            'type' => 'document'
        ])
            ->where('id', '!=', $document->id)
            ->first();
    }

    /**
     * Delete folder
     *
     * @param Request $request
     * @return void
     */
    public function deleteFolder(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
        ]);

        // TODO: check wheter user is the owner of given folder
        // TODO: make sure if it is a file
        $user = request()->user();

        $document = Document::find(decrypt($request->input('document_id')));

        if ($document) {

            if (Document::where(['parent' => $document->id])->first()) {
                return response()->json(['errors' => [['document' => 'Folder is not empty!']]], 422);
            }

            SectionDocuments::where([
                'document_id' => $document->id,
                'comp_id' => $document->comp_id,
            ])->delete();

            CompCtrlDocs::where([
                'comp_id' => $document->comp_id,
                'document_id' => $document->id,
            ])->delete();

            $document->delete();

            return response()->json(['Deleted'], 200);
        }

        return response()->json(['errors' => [['document' => 'Folder not found!']]], 422);
    }

    /**
     * Delete Document
     *
     * @param Request $request
     * @return void
     */
    public function deleteDocument(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
        ]);

        // TODO: check wheter user is the owner of given document
        // TODO: make sure if it is a file

        $document = Document::find(decrypt($request->input('document_id')));

        if ($document) {

            SectionDocuments::where([
                'document_id' => $document->id,
                'comp_id' => $document->comp_id,
            ])->delete();

            CompCtrlDocs::where([
                'comp_id' => $document->comp_id,
                'document_id' => $document->id,
            ])->delete();

            TaskDocuments::where([
                'comp_id' => $document->comp_id,
                'document_id' => $document->id,
            ])->delete();

            $this->storeGlobalActivity($document, 'Deleted');

            $document->delete();

            return response()->json(['Deleted'], 200);
        }

        return response()->json(['errors' => [['document' => 'Document not found!']]], 422);
    }

    /**
     * Delete Uploaded File
     *
     * @param Request $request
     * @return void
     */
    public function deleteFile(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
        ]);

        // TODO: check wheter user is the owner of given document
        // TODO: make sure if it is a file

        try {

            $document = Document::find(decrypt($request->input('document_id')));

            if ($document) {
                SectionDocuments::where([
                    'document_id' => $document->id,
                    'comp_id' => $document->comp_id,
                ])->delete();

                CompCtrlDocs::where([
                    'comp_id' => $document->comp_id,
                    'document_id' => $document->id,
                ])->delete();

                TaskDocuments::where([
                    'comp_id' => $document->comp_id,
                    'document_id' => $document->id,
                ])->delete();

                if ($document->type === 'file') {
                    $target_file = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.' . $document->ext;
                    if (file_exists($target_file)) {
                        unlink($target_file);
                    }
                }

                $this->storeGlobalActivity($document, 'Deleted');

                $document->delete();

                return response()->json(['Deleted'], 200);
            }

            throw new \Exception("File not found", 1);
        } catch (\Throwable $th) {
            return response()->json(['errors' => [['document' => 'File not found!']]], 422);
        }
    }


    public function moveDocument(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'target_folder' => 'required',
        ]);

        // TODO: check wheter user is the owner of given document
        // TODO: make sure if it is a file

        try {
            $document = Document::find(decrypt($request->input('document_id')));
            $target_doc = $request->input('target_folder');

            if (Document::where(['name' => $document->name, 'comp_id' => $document->comp_id, 'parent' => $target_doc, 'type' => 'document'])->first()) {
                return response()->json(['errors' => [['document_name' => '[Dumplicate Entry:] Document is already exists in to the target Folder!']]], 422);
            }

            if ($document) {

                $document->parent = $target_doc;
                $document->save();

                return response()->json(['Moved'], 200);
            }

            throw new \Exception("Document not found!", 1);
        } catch (\Throwable $th) {
            return response()->json(['errors' => [['document' => 'Document not found!']]], 422);
        }
    }

    /**
     * Renamve given folder
     *
     * @param Request $request
     * @return void
     */
    public function renameFolder(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'folder_name' => 'required|max:255',
        ]);

        // TODO: is user has permission to rename folder ???
        $document = Document::with('owner')->find(decrypt($request->input('document_id')));

        if (!$document) {
            return response()->json(['errors' => [['folder_name' => 'Document not found!']]], 422);
        }

        if ($this->hasNameTakenOnUpdate($document, $request->input('folder_name'), $request->input('comp_id'))) {
            return response()->json(['errors' => [['folder_name' => 'Folder with the given name already exists in the current directory!']]], 422);
        }

        $user = request()->user();

        $document->name = $request->input('folder_name');
        $document->updated_by = $user->id;
        $document->save();

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    /**
     * Renamve given Document
     *
     * @param Request $request
     * @return void
     */
    public function reanameDocument(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'document_name' => 'required|max:255',
        ]);

        // TODO: is user has permission to rename document ???
        $document = Document::with('owner')->find(decrypt($request->input('document_id')));

        if (!$document) {
            return response()->json(['errors' => [['document_name' => 'Document not found!']]], 422);
        }

        if ($this->hasDocNameTakenOnUpdate($document, $request)) {
            return response()->json(['errors' => [['document_name' => 'Document with the given name already exists in the current directory!']]], 422);
        }

        $user = request()->user();

        $document->name = $request->input('document_name');
        $document->updated_by = $user->id;
        $document->save();

        $this->storeGlobalActivity($document, 'Renamed');

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    /**
     * save Document content
     *
     * @param Request $request
     * @return void
     */
    public function saveDocument(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'data' => 'required',
        ]);

        // TODO: is user has permission to save document ???
        $document = Document::with('owner')->find(decrypt($request->input('document_id')));

        $user = request()->user();

        $sections = $request->has('sections') && $request->input('sections');

        $document->content = $request->input('data');
        $document->size = mb_strlen($request->input('data'), '8bit');
        $document->updated_by = $user->id;
        $document->modified = now()->toDateTimeString();
        $document->save();

        $this->storeGlobalActivity($document, 'Edited');

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    public function renameFile(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'folder_name' => 'required|max:255',
        ]);

        // TODO: is user has permission to rename folder ???
        $document = Document::with('owner')->find(decrypt($request->input('document_id')));

        if (!$document) {
            return response()->json(['errors' => [['folder_name' => 'Document not found!']]], 422);
        }

        if ($this->hasFileNameTakenOnUpdate($document, $request->input('folder_name'), $request->input('comp_id'), $document->ext, 'file')) {
            return response()->json(['errors' => [['folder_name' => 'File with the given name already exists in the current directory!']]], 422);
        }

        $user = request()->user();

        $document->name = $request->input('folder_name');
        $document->updated_by = $user->id;
        $document->save();

        $this->storeGlobalActivity($document, 'Renamed');

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    public function updateReview(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'field' => 'required',
            'value' => 'required',
            'requester' => 'required'
        ]);

        // TODO: is user has permission to update review date ???
        $document = Document::with('owner')->find(decrypt($request->input('document_id')));

        $user = request()->user();
        $field = $request->input('field');
        $value = $request->input('value');
        $requester = $request->input('requester');

        $document->{$field} = $value;
        $document->{$requester} = $user->id;
        $document->save();

        $this->storeGlobalActivity($document, 'Changed ' . $field . ' date');

        if (request()->wantsJson()) {
            return response()->json(['document' => $document], 200);
        }

        return $document;
    }

    /**
     * Upload new file into filer manager
     *
     * @param Request $request
     * @return void
     */
    public function uploadFile(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'comp_id' => 'required|exists:companies,id',
            'file' => 'required|mimes:doc,docx,xls,xlsx,ppt,pptx,pdf,txt,rtf,odt,ods,odp,csv|max:25000', // max size in kilobytes
        ]);

        // TODO: make sure user has rights to upload files
        $document_id = decrypt($request->input('document_id'));

        $user = $request->user();
        $comp_id = $request->input('comp_id');
        $name = $request->file('file')->getClientOriginalName();

        if ($this->hasFileNameTaken($document_id, $name, $comp_id)) {
            return response()->json(['errors' => [['file' => 'File with the given name already exists in the current directory!']]], 422);
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

        GlobalActivities::create([
            'comp_id' => $comp_id,
            'user_id' => $user->id,
            'activity' => 'Uploaded',
            'event_type' => 'document',
            'document_id' => $document_id,
            'page' => 'Files',
        ]);

        $this->setDirectories($comp_id);

        $document = Document::with('owner')->find($document->id);

        $request->file('file')->move(config('motion.DOCUMENTS_DIR') . $comp_id . '/', $document->id . '.' . $document->ext);

        return response()->json(['message' => $document->name . ' uploaded successfully!', 'document' => $document], 200);
    }

    public function viewDigitalDoc($document_id)
    {
        if (!$document_id) {
            abort(404);
        }

        if ($document = Document::with(['modified_by', 'owner'])->find($document_id)) {
            return response()->json(['document' => $document], 200);
        } else {
            abort(404);
        }
    }

    public function unlinkDocument(Request $request)
    {
        $this->validate($request, [
            'company_document_id' => 'required',
        ]);

        $company_document_id = $request->input('company_document_id');
        $comp_id = $request->input('comp_id');

        $companyDocument = CompCtrlDocs::select('id', 'document_id', 'standard_id', 'section_id', 'control_id')->where(['comp_id' => $comp_id, 'id' => $company_document_id])->first();

        if ($companyDocument) {
            SectionDocuments::where([
                'document_id' => $companyDocument->document_id,
                'comp_id' => $comp_id,
            ])->delete();

            $document = Document::select('id', 'comp_id')->find($companyDocument->document_id);
            $this->storeGlobalActivity($document, 'Unlinked', $companyDocument->standard_id, $companyDocument->section_id, $companyDocument->control_id);

            $companyDocument->delete();

            return response()->json(['Unlinked'], 200);
        }
        return response()->json(['errors' => [['document' => 'Document not found!']]], 422);
    }

    protected function storeGlobalActivity($document, string $activity, int $standard_id = null, int $section_id = null, int $control_id = null)
    {
        $page = request()->has('page') ? request()->input('page') : 'Files';
        $standard_id = request()->has('standard_id') ? request()->input('standard_id') : $standard_id;
        $section_id = request()->has('section_id') ? request()->input('section_id') : $section_id;
        $control_id = request()->has('control_id') ? request()->input('control_id') : $control_id;

        GlobalActivities::create([
            'comp_id' => $document->comp_id,
            'user_id' => request()->user()->id,
            'activity' => $activity,
            'event_type' => 'document',
            'document_id' => $document->id,
            'page' => $page,
            'standard_id' => $standard_id,
            'section_id' => $section_id,
            'control_id' => $control_id,
        ]);
    }
}
