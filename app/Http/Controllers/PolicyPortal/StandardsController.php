<?php

namespace App\Http\Controllers\PolicyPortal;

use App\Http\Controllers\Controller;
use App\Http\Traits\StandardInformation;
use App\Models\CompCtrlDocs;
use App\Models\CompStdDocs;
use App\Models\SharedStandard;
use App\Models\Standard;
use App\Models\StandardSection;
use App\Models\StandardSharedWith;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class StandardsController extends Controller
{
    use StandardInformation;

    public function standards($type)
    {
        if (!$type) {
            abort(404, "Invalid Standard");
        }

        $comp_id = request('comp_id');
        $user_id = request()->user()->id;

        $standards_fields = ['standards.id', 'standards.name', 'standards.slug', 'standards.type', 'standards.overview', 'standards.scope', 'standards.coverage'];

        $standards = $standards = Standard::select($standards_fields)
            ->with(['comp_std_priority' => function ($query) {
                return $query->select('comp_id', 'standard_id', 'priority');
            }])
            ->with(['families' => function ($q) {
                return $q->select('family_id', 'standard_id')->with(['family' => function ($q) {
                    return $q->select('id', 'name');
                }]);
            }])
            ->with(['versions' => function ($q) {
                return $q->select('version_id', 'standard_id')->with(['version' => function ($q) {
                    return $q->select('id', 'name');
                }]);
            }])
            ->with(['focuses' => function ($q) {
                return $q->select('focus_id', 'standard_id')->with(['focus' => function ($q) {
                    return $q->select('id', 'name');
                }]);
            }])
            ->with(['statutes' => function ($q) {
                return $q->select('satue_id', 'standard_id')->with(['satue' => function ($q) {
                    return $q->select('id', 'name');
                }]);
            }])->leftJoin('standard_shared_withs', 'standards.id', '=', 'standard_shared_withs.standard_id')
            ->where(['standard_shared_withs.comp_id' => $comp_id,  'user_id' => $user_id]);

        if ($type == 'All') {
            $standards = $standards->orderBy('standards.name', 'asc')
                ->get();
        } else {
            $standards = $standards->where('type', $type)
                ->orderBy('standards.name', 'asc')
                ->get();
        }

        return $standards->map(function ($standard, $key) use ($comp_id) {

            $standard->documents_count = CompCtrlDocs::select('id')->where(['standard_id' => $standard->id, 'comp_id' => $comp_id, 'pp_visiblity' => true])->count();
            // $standard->documents = CompStdDocs::
            // with(['document' => function ($query) {
            //     $query->select('id', 'name', 'slug', 'comp_id', 'parent', 'ext', 'size', 'type', 'is_default', 'modified');
            // }])
            // ->where(['standard_id' => $standard->id, 'comp_id' => $comp_id])
            // ->get();

            list($applicable, $not_applicable, $partially_imple, $implemented, $excluded_ctrls) = $this->getStandardChartInfo($comp_id, $standard->id);

            $standard->chart_info = [
                'applicable_ctrls' => $applicable,
                'not_applicable_ctrls' => $not_applicable,
                'partially_imple_ctrls' => $partially_imple,
                'implemented_ctrls' => $implemented,
                'excluded_ctrls' => $excluded_ctrls
            ];

            return $standard;
        });

        return $standards;
    }

    public function artifacts($standard_id)
    {
        $comp_id = request('comp_id');
        return CompStdDocs::with('document.owner')
            ->with(['document' => function ($query) {
                $query->select('id', 
                'name', 
                'slug', 
                'comp_id', 
                'parent', 
                'ext', 
                'size', 
                'type', 
                'is_default', 
                'modified', 
                'doc_ref', 
                'created_by', 
                'updated_by', 
                'created_at', 
                'updated_at',
                'version',
                'classification',
            );
            }])
            ->where(['standard_id' => $standard_id, 'comp_id' => $comp_id])
            ->paginate(5);
    }

    public function domains($standard_id)
    {
        if (!$standard_id) {
            abort(404, "Invalid Standard");
        }

        $comp_id = request('comp_id');
        $user_id = request()->user()->id;

        // look if standard is shared 
        if (!StandardSharedWith::where(['comp_id' => $comp_id, 'standard_id' => $standard_id, 'user_id' => $user_id])
            ->first()) {
            abort(404, "Standard not found");
        }     
           
        $shared_standards = StandardSharedWith::where([
            'comp_id' => $comp_id,
            'user_id' => $user_id
        ])->pluck('standard_id')->toArray();

        $sections = StandardSection::select('id', 'menu_name', 'abbreviation', 'description')
            ->with(['sections' => function ($q) use($comp_id) {
                $q->select('id', 'parent', 'menu_name', 'abbreviation', 'description');
            }])
            ->with(['sections.controls' => function ($q) use($shared_standards, $comp_id) {
                $q->select('section_controls.id', 'section_controls.name', 'section_controls.number', 'section_controls.short_name', 'section_controls.standard_section_id', 'comp_ctrls.applicable')
                ->with(['mapped.control' => function($q) use($shared_standards){
                    $q->select('section_controls.id', 'section_controls.standard_section_id', 'section_controls.standard_id', 'section_controls.number', 'section_controls.name', 'section_controls.short_name')
                    ->with(['standard' => function($q) {
                        $q->select('id', 'name');
                    }])
                    ->whereIn('section_controls.standard_id', $shared_standards);
                }])
                ->rightjoin('comp_ctrls', 'section_controls.id', '=', 'comp_ctrls.control_id')
                ->where(['comp_ctrls.comp_id' => $comp_id])
                ->where('comp_ctrls.applicable', '!=', 'Excluded');
            }])
            ->where(['parent' => null])
            ->where('standard_id', $standard_id)
            ->get();  

        return $sections->map(function ($section, $key) use ($comp_id, $standard_id) {
            $section->sections->map(function ($sec, $key) use ($comp_id, $standard_id) {
                $sec->controls->map(function ($control, $key) use ($comp_id, $standard_id) {
                    $control->documents = CompCtrlDocs::select('id', 'comp_id', 'document_id', 'control_id', 'standard_id')->with(['document' => function ($q) {
                        $q->select('id', 'name', 'comp_id', 'ext', 'size', 'type', 'content', 'version', 'classification', 'created_at', 'modified', 'doc_owner')->with('docowner');
                    }])
                        ->where(['comp_id' => $comp_id, 'control_id' => $control->id, 'standard_id' => $standard_id, 'pp_visiblity' => true])
                        ->get();
                    return $control;
                });
            });

            return $section;
        });
    }
}
