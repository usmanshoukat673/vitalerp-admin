<?php

namespace App\Http\Controllers;

use App\Models\SupplierDocument;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class SupplierDocumentViewer extends Controller
{
    public function view($document_id, $supplier_id)
    {
        if (!$document_id) {
            abort(404);
        }

        if ($document = SupplierDocument::where(['id' => $document_id, 'supplier_id' => $supplier_id])->first()) {

            $file = config('vitalerp.supplier_document_directory') . '/' . $document->id . '.' . $document->ext;

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
