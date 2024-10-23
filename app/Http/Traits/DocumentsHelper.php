<?php

namespace App\Http\Traits;

use App\Models\CompCtrlDocs;
use App\Models\FileManager\Document;
use App\Models\SectionDocuments;
use Illuminate\Support\Facades\Log;

trait DocumentsHelper
{
    /**
     * Set Documents directories
     */
    public function setDirectories($comp_id)
    {
        if (!is_dir(config('motion.DOCUMENTS_DIR') . $comp_id)) {
            mkdir(config('motion.DOCUMENTS_DIR') . $comp_id);
        }
    } 

    /**
     * check whether given file is exists in the directory
     *
     * @param [type] $document_id
     * @param [type] $name
     * @param [type] $comp_id
     * @return boolean
     */
    public function hasFileNameTaken($document_id, $name, $comp_id)
    {
        return  Document::where(['name' => $name, 'comp_id' => $comp_id, 'parent' => $document_id, 'type' => 'file'])->first();
    }

    public function generateHtmlToPdf($document)
    {
        $this->setDirectories($document->comp_id);

        $target_html_file = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.html';
        $target_pdf_file = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.pdf';

        $view = view('pdfhelper.html-layout', ['content' => $document->content, 'title' => $document->name]);

        file_put_contents($target_html_file, $view);

        $cmd = config('motion.HTMLTOPDF') . " -s A4 --encoding utf8 " . $target_html_file . " " . $target_pdf_file;

        try {
            $command = exec($cmd);
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    protected function cleanName($string)
    {
        $string = str_replace(' ', '-', $string);

        return preg_replace('/[^A-Za-z0-9.\-]/', '', $string);
    }

    /**
     * check if document has been assigned to session or control
     *
     * @param [type] $document_id
     * @param [type] $comp_id
     * @return void
     */
    public function documentChecks($document_id, $comp_id)
    {
        if (SectionDocuments::where([
            'document_id' => $document_id,
            'comp_id' => $comp_id,
        ])->first()) {
            return true;
        } else if (CompCtrlDocs::where([
            'comp_id' => $comp_id,
            'document_id' => $document_id,
        ])->first()) {
            return true;
        } else {
            return false;
        }
    }

    private function getUniqueDocuments($docs_collection)
    {
        if (count($this->control_documents) > 0) {
            foreach ($this->control_documents as $doc) {

                if (!$docs_collection->containsStrict('document_id', $doc->document_id)) {
                    $docs_collection->push($doc);
                }
            }
        }

        return $docs_collection;
    }
}
