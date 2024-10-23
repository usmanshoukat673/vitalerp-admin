<?php

namespace App\Http\Controllers;

use App\Models\RelatedRecords;
use Illuminate\Http\Request;

class RelatedRecordController extends Controller
{
    public function create($record_id, $related_record_id, $question_id, $asset_id, $module_id)
    {
        if (!RelatedRecords::where([
            'record_id' => $record_id,
            'related_record_id' => $related_record_id,
            'question_id' => $question_id,
            'asset_id' => $asset_id,
            'module_id' => $module_id,
        ])->first()) {
            RelatedRecords::create([
                'record_id' => $record_id,
                'related_record_id' => $related_record_id,
                'question_id' => $question_id,
                'asset_id' => $asset_id,
                'module_id' => $module_id,
            ]);
        }
    }

    public function relatedRecords($record_id)
    {
        return RelatedRecords::with('relatedrecord', 'record')
            ->where(['record_id' => $record_id])
            ->orWhere(['related_record_id' => $record_id])
            ->get();
    }

    public function delete(Request $request)
    {
        $this->validate($request, [
            'record_id' => 'required|exists:related_records,record_id',
            'related_record_id' => 'required|exists:related_records,related_record_id',
        ]);

        $record_id = $request->input('record_id');
        $related_record_id = $request->input('related_record_id');

        return RelatedRecords::where(['record_id' => $record_id, 'related_record_id' => $related_record_id])
            ->delete();
    }
}
