<?php

namespace App\Http\Controllers;

use App\Models\CompCtrls;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

abstract class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function getMappedControls(array $mapped_to_control_ids, int $comp_id): Collection
    {
        $control_mappings =  new Collection([]);

        if (count($mapped_to_control_ids) > 0) {
            $control_mappings = CompCtrls::with(['control' => function ($q) {
                return $q->select('id', 'number', 'name', 'baseline_priority', 'baseline_privacy', 'maturity_level', 'standard_id')
                    ->with(['standard' => function ($q) {
                        $q->select('id', 'name');
                    }]);
            }])
                ->where([
                    'comp_id' => $comp_id,
                ])

                ->whereIn('control_id', $mapped_to_control_ids)
                ->get();
        }

        return $control_mappings;
    }

    protected function getMappedToIdsFromDomainControls(Collection $domain_controls): array
    {
        $mapped_to_ids = [];

        foreach ($domain_controls as $control) {
            foreach ($control->control->mapped as $mapped) {
                if (!in_array($mapped->mapped_to, $mapped_to_ids)) {
                    $mapped_to_ids[] = $mapped->mapped_to;
                }
            }
        }

        return $mapped_to_ids;
    }

    protected function pluckControlIds(Collection $company_controls)
    {
        return $company_controls->pluck('control_id')->values()->toArray();
    }

    protected function getMappedToIds(Collection $mapping_controls): array
    {
        return $mapping_controls->pluck('mapped_to')->values()->toArray();
    }

    protected function groupDocuments(Collection $documents)
    {
         // Group the records by document_id
        $grouped_documents = $documents->groupBy('document_id');

        // Extract unique document_ids and collect associated controls
        $documents = $grouped_documents->map(function ($documents) {
            return [
                'id' => $documents->first()->id,
                'comp_id' => $documents->first()->comp_id,
                'document_id' => $documents->first()->document_id,
                'controls' => $documents->pluck('control')->unique()->values()->toArray(),
                'document' => $documents->first()->document,
                'pp_visiblity' => $documents->first()->pp_visiblity,
                'section_id' => $documents->first()->section_id,
                'source' => $documents->first()->source,
                'standard_id' => $documents->first()->standard_id,
                'updated_at' => $documents->first()->updated_at,
                'updated_by' => $documents->first()->updated_by,
                'created_at' => $documents->first()->created_at,
            ];
        });

        return $documents->values();
    }

    protected function filterControlsBaseonPriority($standard_controls, $company_standard)
    {
        $priorities = [];

        if ($company_standard->priority == 3) {
            $priorities = [1, 2, 3];
        } else if ($company_standard->priority == 2) {
            $priorities = [1, 2];
        } else {
            $priorities = [1];
        }

         $standard_controls = $standard_controls->filter(function ($control) use ($priorities) {
            if (count($control->control->baseline_priorities) == 0) {
                return true;
            } else if (!empty($control->control->baseline_priorities)) {
                if(count($control->control->baseline_priorities) > 0)
                {
                    foreach($control->control->baseline_priorities as $priority)
                    {
                         if (in_array($priority->baseline_priority, $priorities)) {
                            return true;
                            break;
                         }
                    }
                }
            }
            return false;
        });

        return $standard_controls;
    }
}
