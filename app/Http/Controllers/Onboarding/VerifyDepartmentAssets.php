<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Traits\AIBuild;
use App\Jobs\FeatchDepartmentAssets;
use App\Models\BuildAssetExample;
use App\Models\BuildAssets;
use App\Models\BuildBusinessProcess;
use App\Models\BuildFunctions;
use App\Models\BuildSuppliers;
use App\Models\MotionPrompt;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;

class VerifyDepartmentAssets extends Controller
{

    use AIBuild;

    private $suppliers = [
        'Facilities management companies',
        'Cleaning companies',
        'IT support and service providers',
        'Office equipment and supplies providers',
        'Telecommunications companies',
        'Security and access control providers',
        'Janitorial services',
        'Maintenance and repair services',
        'Waste management companies',
        'Catering and food service providers',
        'Marketing and advertising agencies',
        'Legal and accounting firms',
        'Insurance companies',
        'Travel agencies and transportation providers',
        'Printing and graphic design companies',
        'Staffing agencies and recruitment firms',
        'Training and development providers',
        'Energy and utility providers'
    ];

    public function verifyAssets(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'standard_id' => 'required'
        ]);

        try {
            $build_id = decrypt($request->input('build_id'));
            $standard_id = $request->input('standard_id');

            $first_dept = BuildBusinessProcess::select('id')->where(['build_id' => $build_id, 'included' => 1])->first();

            $this->assignHardCodeAsset($build_id, $first_dept->id, $standard_id);

            $deparments = BuildBusinessProcess::select('id', 'name')->where(['build_id' => $build_id, 'included' => 1])->get();

            // get functions for each deparments 
            if (count($deparments) > 0) {
                foreach ($deparments as $deparment) {

                    $functions = $this->getFunctions($build_id, $deparment->id, $standard_id);

                    // check if the assets got executed for given dept 
                    if (!$this->checkAssets($build_id, $deparment->id, $standard_id) && count($functions) > 0) {
                        $functions_string = $this->getCommaSeperatedItems($functions, 'name');
                        $softwares = $this->getPrompt(config('motion.prompt_assets_software'), $deparment->name, $functions_string, $standard_id);
                        FeatchDepartmentAssets::dispatch($build_id, $deparment->id, $standard_id, $softwares, 'software');

                        $hardwares = $this->getPrompt(config('motion.prompt_assets_hardware'), $deparment->name, $functions_string, $standard_id);
                        FeatchDepartmentAssets::dispatch($build_id, $deparment->id, $standard_id, $hardwares, 'hardware');

                        // $vendors = $this->getPrompt(config('motion.prompt_assets_vendor'), $deparment->name, $functions_string, $standard_id);
                        // FeatchDepartmentAssets::dispatch($build_id, $deparment->id, $standard_id, $vendors, 'vendors and suppliers');
                    }
                }
            }

            $this->storeSuppliers($build_id, $standard_id);

            sleep(10);

            return true;
        } catch (DecryptException $e) {
            return $this->invaliData();
        }
    }

    private function storeSuppliers($build_id, $standard_id)
    {
        foreach ($this->suppliers as $name) {
            if (!BuildSuppliers::where([
                'build_id' => $build_id,
                'name' => $name,
                'standard_id' => $standard_id
            ])->first()) {

                BuildSuppliers::create([
                    'build_id' => $build_id,
                    'name' => $name,
                    'standard_id' => $standard_id,
                    'included' => 1,
                    'responded' => 1
                ]);
            }
        }
    }

    private function assignHardCodeAsset($build_id, $deparment_id, $standard_id)
    {
        $build_asset = BuildAssets::create([
            'build_id' => $build_id,
            'name' => 'Productivity Software Suite',
            'included' => 1,
            'type' => 'software',
            'custom' => 1,
            'deparment_id' => $deparment_id,
            'standard_id' => $standard_id
        ]);

        $default_assets = ['Office 365', 'Google Workspace'];

        foreach ($default_assets as $name) {
            BuildAssetExample::create([
                'name' => $name,
                'build_asset_id' => $build_asset->id,
                'standard_id' => $standard_id
            ]);
        }
    }

    private function getFunctions($build_id, $deparment_id, $standard_id)
    {
        return BuildFunctions::select('name')->where(['build_id' => $build_id, 'included' => 1, 'deparment_id' => $deparment_id, 'standard_id' => $standard_id, 'asset_executed' => 0])->get();
    }

    private function getPrompt($type, $dept_name, $functions, $standard_id)
    {
        $prompt = MotionPrompt::where(['standard_id' => $standard_id, 'type' => $type])->first();
        $generated = str_replace('[DEPARTMENT_NAME]', $dept_name, $prompt->prompt);
        $generated = str_replace('[COMMA_LIST_FUNCTIONS]', $functions, $generated);
        return $generated . " " . $prompt->expected_response;
    }

    private function checkAssets($build_id, $deparment_id, $standard_id)
    {
        return (BuildAssets::where(['build_id' => $build_id, 'deparment_id' => $deparment_id, 'standard_id' => $standard_id])->count() > 0 ? true : false);
    }
}
