<?php

namespace App\Http\Controllers;

use App\Exports\Reports\DocsReportManifestExport;
use App\Http\Traits\DocumentsHelper;
use App\Models\CompCtrlDocs;
use App\Models\DocumentationExportLogs;
use App\Models\SectionControl;
use App\Models\Standard;
use App\Models\StandardSection;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;
use Excel;

class DocUploadExportController extends Controller
{

    use DocumentsHelper;

    public function export(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'std_id' => 'required',
        ]);


        $comp_id = $request->input('comp_id');
        $std_id = $request->input('std_id');
        $user = $request->user();

        $this->setDirectories($comp_id);

        $standard = Standard::find($std_id);

        if (!$standard) {
            response()->json([], 404);
        }

        $manifest = collect([[
            'Control',
            'Document Name',
            'Directory'
        ]]);

        $timestamp = $this->cleanName(now()->toDateTimeString());

        $folder_name = $this->cleanName($standard->name) . "_" . $user->id . $timestamp;

        $manifest_name = 'manifest_' . $user->id . $timestamp . '.xlsx';

        $this->setupRootFolder($folder_name);

        $folder_path = $folder_name;

        $parent_sections = StandardSection::select('id', 'menu_name', 'abbreviation')
            ->with(['sections.controls' => function ($q) {
                $q->select('id', 'name', 'number', 'short_name', 'standard_section_id');
            }])

            ->where(['parent' => null])
            ->where(['standard_id' => $std_id])
            ->get();

        if (count($parent_sections) > 0) {
            foreach ($parent_sections as $psection) {

                $psection_path = $folder_path . '/' . $psection->menu_name;

                if (!is_dir($psection_path)) {
                    mkdir($psection_path);
                }

                if (count($psection->sections) > 0) {
                    foreach ($psection->sections as $section) {

                        $section_path = $psection_path . '/' . $section->menu_name;

                        if (!is_dir($section_path)) {
                            mkdir($section_path);
                        }

                        if (count($section->controls) > 0) {
                            foreach ($section->controls as $control) {

                                $control_path = $section_path . '/' . $control->number . " " . $this->cleanName(trim(substr($control->name, 0, 50)));

                                if (!is_dir($control_path)) {
                                    mkdir($control_path);
                                }

                                $manifest = $this->copyDocuments($control, $control_path, $std_id, $comp_id, $manifest);
                            }
                        }
                    }
                }
            }
        }

        $this->exportManifest($manifest, $manifest_name, $folder_path, $comp_id);

        $mime = "application/zip";

        $file_name = $folder_name . '.zip';

        exec("zip -r " . $file_name . " " . $folder_path);

        DocumentationExportLogs::create([
            'name' => $file_name,
            'location' => config('motion.DOCUMENTS_DIR') . $comp_id . '/' . $file_name,
            'comp_id' => $comp_id,
            'manifest' => $manifest_name,
            'manifest_location' => config('motion.DOCUMENTS_DIR') . $comp_id . '/' . $manifest_name,
            'standard_id' => $std_id,
            'created_by' => $user->id,
        ]);

        $the_target_zip_file = public_path($file_name);

        if (!is_dir($the_target_zip_file)) {
            copy($the_target_zip_file, config('motion.DOCUMENTS_DIR') . $comp_id . '/' . $file_name);
        }

        File::deleteDirectory(public_path($folder_path));

        return response()->download($file_name, $folder_name, ['Content-Type' => $mime])->deleteFileAfterSend(true);
    }

    public function copyDocuments($control, $control_path, $std_id, $comp_id, $manifest)
    {
        $documents = CompCtrlDocs::with(['document' => function ($query) {
            $query->whereIn('type', ['file', 'document']);
        }])->where([
            'comp_id' => $comp_id,
            'control_id' => $control->id,
            'standard_id' => $std_id,
        ])->get();

        if (count($documents) > 0) {

            $documents_path = config('motion.DOCUMENTS_DIR') . $comp_id . '/';

            foreach ($documents as $doc) {
                if ($doc->document->type == 'file') {
                    $target_file = $documents_path . $doc->document->id . '.' . $doc->document->ext;
                    $document_name = $this->cleanName($doc->document->name);
                    if (file_exists($target_file)) {
                        copy($target_file, $control_path . '/' . $document_name);
                    }

                    $manifest->push([
                        $control->number . " " . $control->name,
                        $document_name,
                        $control_path
                    ]);
                } elseif ($doc->document->type == 'document') {
                    // generate html
                    $this->generateHtmlToPdf($doc->document);
                    $target_doc = $documents_path . $doc->document->id . '.pdf';
                    $document_name = $this->cleanName($doc->document->name) . '.pdf';
                    if (file_exists($target_doc)) {
                        copy($target_doc, $control_path . '/' . $document_name);
                    }

                    $manifest->push([
                        $control->number . " " . $control->name,
                        $document_name,
                        $control_path
                    ]);
                }
            }
        }

        return $manifest;
    }

    public function setupRootFolder($folder_name)
    {
        if (!is_dir($folder_name)) {
            mkdir($folder_name);
        }
    }

    public function customExport(Request $request)
    {
        $message = [
            'controls.required' => 'Controls are required to generate custom report.',
        ];

        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id',
            'std_id' => 'required',
            'controls' => 'required',
        ], $message);


        $comp_id = $request->input('comp_id');
        $controls = (array)$request->input('controls');
        $std_id = $request->input('std_id');
        $user = $request->user();

        $controls = SectionControl::select('id', 'name', 'number', 'short_name', 'standard_section_id')
            ->where(['standard_id' => $std_id])
            ->whereIn('id', $controls)
            ->get();

        $this->setDirectories($comp_id);

        $standard = Standard::find($std_id);

        if (!$standard) {
            response()->json([], 404);
        }

        $manifest = collect([[
            'Control',
            'Document Name',
            'Directory'
        ]]);

        $timestamp = $this->cleanName(now()->toDateTimeString());

        $folder_name = $this->cleanName($standard->name) . "_" . $user->id . $timestamp;

        $manifest_name = 'manifest_' . $user->id . $timestamp . '.xlsx';

        $this->setupRootFolder($folder_name);

        $folder_path = $folder_name;

        if (count($controls) > 0) {
            foreach ($controls as $control) {
                $control_path = $folder_path . '/' . $control->number . " " . $this->cleanName(trim(substr($control->name, 0, 50)));

                if (!is_dir($control_path)) {
                    mkdir($control_path);
                }

                $manifest = $this->copyDocuments($control, $control_path, $std_id, $comp_id, $manifest);
            }
        }

        $this->exportManifest($manifest, $manifest_name, $folder_path, $comp_id);

        $mime = "application/zip";

        $file_name = $folder_name . '.zip';

        exec("zip -r " . $file_name . " " . $folder_path);

        DocumentationExportLogs::create([
            'name' => $file_name,
            'location' => config('motion.DOCUMENTS_DIR') . $comp_id . '/' . $file_name,
            'comp_id' => $comp_id,
            'standard_id' => $std_id,
            'manifest' => $manifest_name,
            'manifest_location' => config('motion.DOCUMENTS_DIR') . $comp_id . '/' . $manifest_name,
            'created_by' => $user->id,
            'custom' => true
        ]);

        $the_target_zip_file = public_path($file_name);

        if (file_exists($the_target_zip_file)) {
            copy($the_target_zip_file, config('motion.DOCUMENTS_DIR') . $comp_id . '/' . $file_name);
        }

        File::deleteDirectory(public_path($folder_path));

        return response()->download($file_name, $folder_name, ['Content-Type' => $mime])->deleteFileAfterSend(true);
    }

    public function exportManifest($manifest, $manifest_name, $folder_path, $comp_id)
    {
        Excel::store(new DocsReportManifestExport($manifest), $manifest_name);

        $target_manifest = storage_path('app/' . $manifest_name);
        if (file_exists($target_manifest)) {
            copy($target_manifest, $folder_path . '/' . 'manifest.xlsx');
            copy($target_manifest, config('motion.DOCUMENTS_DIR') . $comp_id . '/' . $manifest_name);
        }

        File::delete($target_manifest);
    }
}
