<?php

namespace App\Http\Controllers;

use App\Models\FileManager\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class PDFViwer extends Controller
{
    public function view($document_id)
    {
        if (!$document_id) {
            abort(404);
        }

        if ($document = Document::find($document_id)) {

            $file = config('motion.DOCUMENTS_DIR') . $document->comp_id . '/' . $document->id . '.' . $document->ext;

            if (File::exists($file)) {
                $headers = [
                    'Content-Type' => 'application/pdf'
                ];

                return response()->download($file, $document->name, $headers, 'inline');
            }
            else{
                abort(404, 'File not found');
            }
        } else {
            abort(404, 'File not found');
        }
    }
}
