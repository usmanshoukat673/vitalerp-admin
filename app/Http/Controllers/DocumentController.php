<?php

namespace App\Http\Controllers;

use App\Models\FileManager\Document;
use Exception;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    public function saveMeta(Request $request)
    {
        $this->validate($request, [
            'document_id' => 'required',
            'field' => 'required',
            'value' => 'required',
        ]);

        try {
            $document_id = decrypt($request->input('document_id'));
        } catch (Exception $e) {
            abort(404);
        }

        $field = $request->input('field');
        $value = $request->input('value');
        $user = $request->user();

        $document = Document::find($document_id);

        if ($field == 'version') {
            $document->version = $value;
        } else if ($field == 'doc_owner') {
            $document->doc_owner = $value;
        } else if ($field == 'classification') {
            $document->classification = $value;
        } else if ($field == 'created') {
            $document->created_at = $value;
        } else if ($field == 'modified') {
            $document->modified = $value;
        }

        $document->updated_by = $user->id;
        $document->save();

        $document = Document::with('docowner')->find($document_id);

        return $document;
    }
}
