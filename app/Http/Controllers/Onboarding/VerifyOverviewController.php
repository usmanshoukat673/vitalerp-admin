<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Traits\AccountCreation;
use App\Http\Traits\AIBuild;
use App\Models\BuildBusinessProcess;
use App\Models\BuildRequest;
use App\Models\MotionPrompt;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use OpenAI;

class VerifyOverviewController extends Controller
{
    use AccountCreation, AIBuild;

    public function verifyOverview(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'overview' => 'required',
        ]);

        try {
            $buildRequest = BuildRequest::where(['active' => 1, 'id' => decrypt($request->input('build_id'))])->first();
            $overview = $request->input('overview');

            if (!$buildRequest) {
                return $this->invaliData();
            }

            $buildRequest->overview = $overview;
            $buildRequest->save();

            if ($this->countBusinessProcesses($buildRequest->id) > 0) {
                return encrypt($buildRequest->id);
            }

            // $prompt = 'Business departments are the parts of a company usually defined with an org chart.
            // INSTRUCTIONS=Write a list of the top 5 departments for a business with the following description: "'.$overview.'". 
            // Do not include the following departments; operations, information technology, finance, human resources, marketing and sales. Do not include department descriptions. 
            // Response JSON fromatted array [{"name": }]';

            // $prompt = '
            //     Business departments are the parts of a company usually defined with an org chart.
            //     The critical business departments:
            //     Sales and Business Development,
            //     Marketing,
            //     Human Resources,
            //     Finance and Accounting,
            //     Operations and Supply Chain,
            //     Customer Service,
            //     Information Technology,
            //     Research and Development,
            //     Procurement and Sourcing,
            //     Legal
            //     [INSTRUCTIONS] taking into consideration this list of business departments, rewrite the list and include unique business departments for a company with the following description "' . $overview . '"; JSON fromatted array [{"name": }]';

            $prompt = $this->getPrompt(config('motion.prompt_bu_depts'), $overview);
            $processes = $this->getBusinessProcesses($prompt);

            $this->storeBusinessProcess($buildRequest->id, $processes);

            return encrypt($buildRequest->id);
            
        } catch (DecryptException $e) {
            return $this->invaliData();
        }
    }

    private function getPrompt($id, $company_desc)
    {
        $prompt = MotionPrompt::find($id);
        $generated = str_replace('[COMPANY_DESCRIPTION]', $company_desc, $prompt->prompt);
        return $generated . " " . $prompt->expected_response;
    }

    private function countBusinessProcesses($build_id)
    {
        return BuildBusinessProcess::select('id')->where(['build_id' => $build_id])->count();
    }

    private function storeBusinessProcess($build_id, $processes)
    {
        // $processes = array_filter(preg_split("/\n/", $processes));

        $hardcodedDepts = ['Operations', 'Information technology', 'Finance', 'Human Resources', 'Marketing and Sales'];

        foreach ($hardcodedDepts as $dept) {
            if (!BuildBusinessProcess::where(['build_id' => $build_id, 'name' => $dept])->first()) {
                BuildBusinessProcess::create([
                    'build_id' => $build_id,
                    'name' => $dept
                ]);
            }
        }
       

        if (count($processes) > 0) {
            // foreach ($processes as $key => $number) {
            //     $number = preg_replace("/^[0-9]+\.\s/", "", $number);
            //     $processes[$key] = $number;
            // }

            foreach ($processes as $process) {
                if (!BuildBusinessProcess::where(['build_id' => $build_id, 'name' => $process->name])->first()) {
                    BuildBusinessProcess::create([
                        'build_id' => $build_id,
                        'name' => $process->name
                    ]);
                }
            }
        }
    }

    private function getBusinessProcesses($query)
    {
        return json_decode($this->execute_chat_gpt_prompt($query));
    }
}
