<?php

namespace App\Http\Controllers;

use App\Helpers\FileHelper;
use App\Models\Whistleblow;
use App\Models\WhistleFiles;
use App\Models\WhistleReport;
use Illuminate\Http\Request;

class WhistleRerportController extends Controller
{
    public function index(Request $request)
    {
        $whistle = Whistleblow::select('id', 'comp_id')->where(['comp_id' => $request->input('comp_id')])->first();
        return WhistleReport::with('category', 'files')->where(['whistle_id' => $whistle->id])->get();
    }

    public function view($id)
    {
        try {
            $id = decrypt($id);
        } catch (\Exception $th) {
            //throw $th;
            abort(404);
        }

        return WhistleReport::with(['category', 'files'])->find($id);
    }
    public function attachment($id)
    {
        $attachment = WhistleFiles::find($id);

        if (!$attachment) {
            return abort(404);
        }

        $filePath = $attachment->location . $attachment->id . "." . $attachment->ext;

        $mimeType = FileHelper::getMimeType($attachment->ext);

        return response()->download($filePath, $attachment->name, ['Content-Type' => $mimeType]);
    }
}
