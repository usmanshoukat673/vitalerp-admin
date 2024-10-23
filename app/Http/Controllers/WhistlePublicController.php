<?php

namespace App\Http\Controllers;

use App\Helpers\FileHelper;
use App\Mail\NewWhistleblowerReport;
use App\Models\Company;
use App\Models\Whistleblow;
use App\Models\WhistleCategory;
use App\Models\WhistleFiles;
use App\Models\WhistleRecipient;
use App\Models\WhistleReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;

class WhistlePublicController extends Controller
{
    private function acceptable_type($type)
    {
        $types = ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'];

        return in_array($type, $types);
    }

    public function index(Request $request)
    {
        $report_link = $request->header('Custom-Whistle-Report-Link');

        return Whistleblow::with(['recipients' => function ($q) {
            return $q->select('id', 'whistle_id', 'name');
        }])
            ->with(['company' => function ($q) {
                return $q->select('id', 'name');
            }])
            ->where(['report_link' => $report_link])->first();
    }

    public function code($code_encrypted)
    {
        try {
            return response(['code' => decrypt($code_encrypted)], 200);
        } catch (\Throwable $th) {
            //throw $th;
            return response('invalid report id', 404);
        }
    }

    public function submit(Request $request)
    {
        $this->validate($request, [
            'category' => 'required',
            'more_information' => 'required'
        ]);

        $report_link = $request->header('Custom-Whistle-Report-Link');

        if (count($request->allFiles()) > 0) {
            $errorText = '';
            foreach ($request->allFiles() as $file) {
                if (!$this->acceptable_type(strtolower($file->getClientOriginalExtension()))) {
                    $errorText .= $file->getClientOriginalName() . " is not supported <br />";
                }

                if ($file->getSize() === 0) {
                    $errorText .= $file->getClientOriginalName() . " is invalid <br />";
                }

                if ($file->getSize() > 20971520) {
                    $errorText .= $file->getClientOriginalName() . " has exceeds 20 MB upload limit. <br />";
                }
            }

            if ($errorText != '') {
                $errors['errors']['attachments'] = [$errorText];
                return response()->json($errors, 422);
            }
        }

        $whistle = Whistleblow::where(['report_link' => $report_link])->first();

        $company = Company::find($whistle->comp_id);

        $this->setWhistleDirectories($whistle->comp_id);

        $category = $request->input('category');
        $more_information = $request->input('more_information');

        $report_code = $this->generateRandomCode();

        $whistle_report = WhistleReport::create([
            'code' => Hash::make($report_code),
            'whistle_id' => $whistle->id,
            'wshigle_category_id' => $category,
            'description' => encrypt($more_information)
        ]);

        if (count($request->allFiles()) > 0) {
            foreach ($request->allFiles() as $file) {
                $document = WhistleFiles::create([
                    'whistle_report_id' => $whistle_report->id,
                    'name' => $file->getClientOriginalName(),
                    'size'       => $file->getSize(),
                    'ext'        => strtolower($file->getClientOriginalExtension()),
                    'location' => config('motion.whistle_dir') . $whistle->comp_id . '/'
                ]);
                $file->move(config('motion.whistle_dir') . $whistle->comp_id . '/', $document->id . '.' . $document->ext);
            }
        }

        $category = WhistleCategory::find($category);

        $all_recipients = WhistleRecipient::select('id', 'whistle_id', 'email')
            ->where(['whistle_id' => $whistle->id])->get();

        if (count($all_recipients) > 0) {
            $recipients = $all_recipients->pluck('email')->toArray();

            $url = url('/login?redirect=' . '/'.$company->slug.'/organization-settings/whistleblower/view/r/'.encrypt($whistle_report->id));

            $message = (new NewWhistleblowerReport(['report_id' => $whistle_report->id, 'category' => $category->name, 'url' => $url]))->onQueue(config('motion.DEFAULT_QUEUE'));
            Mail::to($recipients)
                ->queue($message);
        }

        return response(['id' => encrypt($report_code)]);
    }

    public function check(Request $request)
    {
        $this->validate($request, [
            'report_code' => 'required',
        ]);

        $code = $request->input('report_code');

        $report_link = $request->header('Custom-Whistle-Report-Link');

        $report = $this->validate_report_code($report_link, $code);

        if (!$report) {
            return response()->json(['errors' => ['report_code' => ['Invalid Report code.']]], 422);
        }

        return [
            'category' => $report->category->name,
            'description' => $report->description,
            'date' => $report->created_at,
            'attachments' => $report->files
        ];
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

    private function validate_report_code($report_link, $code)
    {
        $whistle = Whistleblow::select('id')->where(['report_link' => $report_link])->first();
        $reports = WhistleReport::where(['whistle_id' => $whistle->id])->get();

        foreach ($reports as $report) {
            if ($report && Hash::check($code, $report->code)) {

                return WhistleReport::with(['category', 'files'])->find($report->id);
            }
        }

        return false;
    }

    // Method to generate an 8-digit random code
    private function generateRandomCode()
    {
        $min = 10000000; // Minimum 8-digit number
        $max = 99999999; // Maximum 8-digit number

        $randomCode = mt_rand($min, $max); // Use mt_rand for better randomization

        return $randomCode;
    }

    /**
     * Set Whistle Documents directories
     */
    private function setWhistleDirectories($comp_id)
    {
        if (!is_dir(config('motion.whistle_dir') . $comp_id)) {
            mkdir(config('motion.whistle_dir') . $comp_id);
        }
    }
}
