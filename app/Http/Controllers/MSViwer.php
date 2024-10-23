<?php

namespace App\Http\Controllers;

use App\Models\FileManager\Document;
use Illuminate\Http\Request;

class MSViwer extends Controller
{
    public function view($document_id, $name)
    {
        if (!$document_id) {
            abort(404);
        }

        if ($document = Document::find(decrypt($document_id))) {

            $file = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.' . $document->ext;

            $headers = [
                'Content-Type' => $this->getMimeType($document->ext)
            ];

            return response()->download($file, $document->name, $headers, 'inline');
        } else {
            abort(404);
        }
    }

    public function getMimeType($ext)
    {
        $mime_types = [
            'pdf' => 'application/pdf',
            'txt' => 'text/plain',
            'html' => 'text/html',
            'htm' => 'text/html',
            'exe' => 'application/octet-stream',
            'zip' => 'application/zip',
            'doc' => 'application/msword',
            'xls' => 'application/vnd.ms-excel',
            'ppt' => 'application/vnd.ms-powerpoint',
            'gif' => 'image/gif',
            'png' => 'image/png',
            'jpeg' => 'image/jpg',
            'jpg' => 'image/jpg',
            'php' => 'text/plain',
            'csv' => 'text/csv',
            'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (isset($mime_types[$ext])) {
            return $mime_types[$ext];
        } else {
            return 'application/octet-stream';
        }
    }
}
