<?php

namespace App\Http\Controllers\Onboarding;

use App\Http\Controllers\Controller;
use App\Http\Traits\AccountCreation;
use App\Models\BuildBusinessProcess;
use App\Models\Standard;
use App\Models\StandardSection;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use OpenAI;

class VerifyProcessesController extends Controller
{
    use AccountCreation;
    
    public function verifyProcesses(Request $request)
    {
        $this->validate($request, [
            'build_id' => 'required',
            'standard_id' => 'required'
        ]);

        try {

            $build_id = decrypt($request->input('build_id'));
            $standard_id = $request->input('standard_id');
            $standard = Standard::select('id', 'description')->find($standard_id);
            $subDomains = StandardSection::select('id', 'name')->where(['standard_id' => $standard_id])->where('parent', '>', 0)->get();
            return $subDomains = $this->filterConnection($subDomains);
            $processes = BuildBusinessProcess::select('id', 'name')->where(['build_id' => $build_id, 'included' => 1])->get();
            $processes = $this->filterConnection($processes);

            $prompt = 'Assign the following '.$standard->description.' Activities; "' . $subDomains . '" to the following business processes; "' . $processes . '" in php array formatted'; 

            $response = $this->getBusinessProcess($prompt);
            
            Log::info($response);

            return $response;

        } catch (DecryptException $e) {
            return $this->invaliData();
        }
    }

    private function getBusinessProcess($query)
    {
        $client = OpenAI::client(config('motion.chatgpt_key'));

        $result = $client->completions()->create([
            'model' => 'text-davinci-003',
            'prompt' => $query,
            'temperature' => 0.7,
            'max_tokens' => 256,
            'top_p' => 1,
            'frequency_penalty' => 0,
            'presence_penalty' => 0
        ]);

        return $result['choices'][0]['text'];
    }

    private function filterConnection($items){
        $items = $items->map(function ($item) {
            $name = explode(' ', $item->name);
            if(count($name) > 0)
            {
                array_shift($name);
                return implode(" ", $name);
            }
            else{
                $item->name;
            }
        });
        $items = implode(', ', $items->all());

        return $items;
    }
}
