<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Traits\AccountCreation;
use App\Http\Traits\AIBuild;
use App\Jobs\FetchDepartmentFunctions;
use App\Models\BuildBusinessProcess;
use App\Models\BuildFunctions;
use App\Models\MotionPrompt;
use App\Models\Standard;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class  VerifyBusinessDepartments extends Controller
{
    use AccountCreation, AIBuild;

    public function verifyDepts(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'standard_id' => 'required'
        ]);

        try {
            $build_id = decrypt($request->input('build_id'));
            $standard_id = $request->input('standard_id');

            if (BuildFunctions::where(['build_id' => $build_id, 'standard_id' => $standard_id])->count() > 0) {
                return true;
            }

            $standard = Standard::select('id', 'description')->find($standard_id);
            $deparments = BuildBusinessProcess::select('id', 'name')->where(['build_id' => $build_id, 'included' => 1])->get();

            // get functions for each deparments 
            if (count($deparments) > 0) {
                foreach ($deparments as $deparment) {
                    // $prompt = 'A business function refers to a specific area of activity or responsibility within a company or organization that is necessary to achieve its overall objectives. Create a list of the top 5 business functions for the ' . $deparment->name . ' deparment; JSON fromatted array [{"name": }]';

                    $prompt = $this->getPrompt(config('motion.prompt_bu_functions'), $deparment->name, $standard_id);

                    FetchDepartmentFunctions::dispatch($build_id, $deparment->id, $standard_id, $prompt);
                }
            }

            sleep(10);

            return true;
        } catch (DecryptException $e) {
            return $this->invaliData();
        }
    }

    private function getPrompt($type, $dept_name, $standard_id)
    {
        $prompt = MotionPrompt::where(['standard_id' => $standard_id, 'type' => $type])->first();
        $generated = str_replace('[DEPARTMENT_NAME]', $dept_name, $prompt->prompt);
        return $generated . " " . $prompt->expected_response;
    }
}
