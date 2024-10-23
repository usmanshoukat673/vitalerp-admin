<?php

namespace App\Http\Controllers;

use App\Models\DocumentationExportLogs;
use Illuminate\Http\Request;

class DocUploadExportLogs extends Controller
{
    public function history(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required|exists:companies,id'
        ]);

        $comp_id = $request->input('comp_id');

        $logs = DocumentationExportLogs::where(['comp_id' => $comp_id])->get();

        return response()->json(['logs' => $logs], 200);
    }

    public function download(Request $request)
    {
        $this->validate($request, [
            'report_id' => 'required'
        ]);

        $report_id = $request->input('report_id');

        $report = DocumentationExportLogs::find($report_id);

        if (!$report) {
            return response()->json([], 404);
        }

        $mime = "application/zip";

        return response()->download($report->location, $report->name, ['Content-Type' => $mime]);
    }
}
