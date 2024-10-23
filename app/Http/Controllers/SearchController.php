<?php

namespace App\Http\Controllers;

use App\Models\FileManager\Document;
use App\Models\SectionControl;
use App\Models\StandardSection;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standards' => 'required',
            'query' => 'required',
        ]);

        $comp_id = $request->input('comp_id');

        $standards = $request->input('standards');

        $term = $request->input('query');
        $search_items = explode(" ", $term);

        $controls = SectionControl::where(function ($query) use ($search_items, $term) {
            if (count($search_items) > 1) {
                for ($i = 0; $i < count($search_items); $i++) {
                    $query->orwhere('name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('number', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('short_name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('description', 'LIKE',  '%' . $search_items[$i] . '%');
                }
            } else {
                $query->orwhere('name', 'LIKE',  '%' . $term . '%')
                    ->orwhere('number', 'LIKE',  '%' . $term . '%')
                    ->orwhere('short_name', 'LIKE',  '%' . $term . '%')
                    ->orwhere('description', 'LIKE',  '%' . $term . '%');
            }
        })
            // where('name', 'LIKE', '%' . $query . '%')
            // ->orWhere('number', 'LIKE', '%' . $query . '%')
            // ->orWhere('short_name', 'LIKE', '%' . $query . '%')
            // ->orWhere('description', 'LIKE', '%' . $query . '%')
            ->whereHas('section', function ($query) use ($standards) {
                $query->whereIn('standard_id', $standards);
            })
            // ->limit(5)
            ->get();

        $controls = $controls->map(function ($control) {
            return [
                'id' => $control->id,
                'key' => $control->id,
                'type' => 'control',
                'control' => $control,
                'title' => $control->name,
                'description' => $this->get_words($control->description) . '...',
            ];
        });

        // $sections = StandardSection::search($term)
        //     // ->whereIn('standard_id', $standards)
        //     ->get();


        $sections = StandardSection::where(function ($query) use ($search_items, $term) {
            if (count($search_items) > 1) {
                for ($i = 0; $i < count($search_items); $i++) {
                    $query->orwhere('name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('menu_name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('description', 'LIKE',  '%' . $search_items[$i] . '%');
                }
            } else {
                $query->orwhere('name', 'LIKE',  '%' .  $term . '%')
                    ->orwhere('menu_name', 'LIKE',  '%' .  $term . '%')
                    ->orwhere('description', 'LIKE',  '%' .  $term . '%');
            }
        })
            // ->orWhere('menu_name', 'LIKE', '%' . $query . '%')
            // ->orWhere('description', 'LIKE', '%' . $query . '%')
            ->whereIn('standard_id', $standards)
            // ->limit(5)
            ->get();


        $sections = $sections->map(function ($section) {
            return [
                'id' => $section->id,
                'key' => $section->id,
                'type' => 'section',
                'section' => $section,
                'title' => $section->name,
                'description' => $this->get_words($section->description) . '...',
            ];
        });

        $documents = Document::where(function ($query) use ($search_items, $term) {
            if (count($search_items) > 1) {
                for ($i = 0; $i < count($search_items); $i++) {
                    $query->orwhere('name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('content', 'LIKE',  '%' . $search_items[$i] . '%');
                }
            } else {
                $query->orwhere('name', 'LIKE',  '%' . $term . '%')
                    ->orwhere('content', 'LIKE',  '%' . $term . '%');
            }
        })
            // where('name', 'LIKE', '%' . $query . '%')
            // ->orWhere('content', 'LIKE', '%' . $query . '%')
            ->where('comp_id', $comp_id)
            // ->limit(5)
            ->get();

        $documents = $documents->map(function ($document) {
            return [
                'id' => $document->id,
                'key' => $document->id,
                'type' => 'document',
                'title' => $document->name,
                'description' => '',
            ];
        });

        $results = [];

        if (count($sections) > 0) {
            $results['sections'] = [
                'name' => 'Sections',
                'results' => $sections
            ];
        }
        if (count($controls) > 0) {
            $results['controls'] = [
                'name' => 'Controls',
                'results' => $controls
            ];
        }

        if (count($documents) > 0) {
            $results['documents'] = [
                'name' => 'Documents',
                'results' => $documents
            ];
        }

        if ($request->wantsJson()) {
            return response()->json([
                'results' => $results
                // [
                //     'sections' => [
                //         'name' => 'Sections',
                //         'results' => $sections
                //     ],
                //     'controls' => [
                //         'name' => 'Controls',
                //         'results' => $controls
                //     ],
                //     'documents' => [
                //         'name' => 'Documents',
                //         'results' => $documents
                //     ],
                // ]
            ], 200);
        }
    }

    public function custom(Request $request)
    {
        $this->validate($request, [
            'comp_id' => 'required',
            'standards' => 'required',
            'query' => 'required',
        ]);

        $comp_id = $request->input('comp_id');

        $standards = $request->input('standards');

        $term = $request->input('query');
        $search_items = explode(" ", $term);

        $controls = SectionControl::with(['standard' => function ($query) {
                $query->select('id', 'name');
            }])
            ->where(function ($query) use ($search_items, $term) {
                if (count($search_items) > 1) {
                    for ($i = 0; $i < count($search_items); $i++) {
                        $query->orwhere('name', 'LIKE',  '%' . $search_items[$i] . '%')
                            ->orwhere('number', 'LIKE',  '%' . $search_items[$i] . '%')
                            ->orwhere('short_name', 'LIKE',  '%' . $search_items[$i] . '%')
                            ->orwhere('description', 'LIKE',  '%' . $search_items[$i] . '%');
                    }
                } else {
                    $query->orwhere('name', 'LIKE',  '%' . $term . '%')
                        ->orwhere('number', 'LIKE',  '%' . $term . '%')
                        ->orwhere('short_name', 'LIKE',  '%' . $term . '%')
                        ->orwhere('description', 'LIKE',  '%' . $term . '%');
                }
            })
            // where('name', 'LIKE', '%' . $query . '%')
            // ->orWhere('number', 'LIKE', '%' . $query . '%')
            // ->orWhere('short_name', 'LIKE', '%' . $query . '%')
            // ->orWhere('description', 'LIKE', '%' . $query . '%')
            ->whereHas('section', function ($query) use ($standards) {
                $query->whereIn('standard_id', $standards);
            })
            // ->limit(5)
            ->get();

        $controls = $controls->map(function ($control) {
            return [
                'id' => $control->id,
                'key' => $control->id,
                'type' => 'control',
                'control' => $control,
                'title' => $control->name,
                'description' => $this->get_words($control->description) . '...',
            ];
        });

        // $sections = StandardSection::search($term)
        //     // ->whereIn('standard_id', $standards)
        //     ->get();


        $sections = StandardSection::with(['standard' => function ($q) {
            $q->select('id', 'name');
        }])->where(function ($query) use ($search_items, $term) {
            if (count($search_items) > 1) {
                for ($i = 0; $i < count($search_items); $i++) {
                    $query->orwhere('name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('menu_name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('description', 'LIKE',  '%' . $search_items[$i] . '%');
                }
            } else {
                $query->orwhere('name', 'LIKE',  '%' .  $term . '%')
                    ->orwhere('menu_name', 'LIKE',  '%' .  $term . '%')
                    ->orwhere('description', 'LIKE',  '%' .  $term . '%');
            }
        })
            // ->orWhere('menu_name', 'LIKE', '%' . $query . '%')
            // ->orWhere('description', 'LIKE', '%' . $query . '%')
            ->whereIn('standard_id', $standards)
            // ->limit(5)
            ->get();


        $sections = $sections->map(function ($section) {
            return [
                'id' => $section->id,
                'key' => $section->id,
                'type' => 'section',
                'section' => $section,
                'title' => $section->name,
                'standard_name' => $section->standard->name,
                'description' => $this->get_words($section->description) . '...',
            ];
        });

        $documents = Document::where(function ($query) use ($search_items, $term) {
            if (count($search_items) > 1) {
                for ($i = 0; $i < count($search_items); $i++) {
                    $query->orwhere('name', 'LIKE',  '%' . $search_items[$i] . '%')
                        ->orwhere('content', 'LIKE',  '%' . $search_items[$i] . '%');
                }
            } else {
                $query->orwhere('name', 'LIKE',  '%' . $term . '%')
                    ->orwhere('content', 'LIKE',  '%' . $term . '%');
            }
        })
            // where('name', 'LIKE', '%' . $query . '%')
            // ->orWhere('content', 'LIKE', '%' . $query . '%')
            ->where('comp_id', $comp_id)
            // ->limit(5)
            ->get();

        $documents = $documents->map(function ($document) {
            return [
                'id' => $document->id,
                'key' => $document->id,
                'type' => 'document',
                'title' => $document->name,
                'description' => '',
            ];
        });

        $results = [];

        if (count($sections) > 0) {
            $results['sections'] = [
                'name' => 'Sections',
                'results' => $sections
            ];
        }
        if (count($controls) > 0) {
            $results['controls'] = [
                'name' => 'Controls',
                'results' => $controls
            ];
        }

        if (count($documents) > 0) {
            $results['documents'] = [
                'name' => 'Documents',
                'results' => $documents
            ];
        }

        if ($request->wantsJson()) {
            return response()->json([
                'results' => $results
            ], 200);
        }
    }

    protected function get_words($sentence, $count = 10)
    {
        preg_match("/(?:\w+(?:\W+|$)){0,$count}/", $sentence, $matches);
        return $matches[0];
    }
}
