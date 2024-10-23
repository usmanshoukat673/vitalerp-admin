<?php

namespace App\Filters;

use Illuminate\Support\Facades\Log;

class StandardsFilter extends Filters
{
    protected $filters = ['search', 'types', 'families', 'versions', 'focuses', 'statutes'];
    protected function search()
    {
        if ($this->request->has('search_term')) {
            $search_term = $this->searchTextCleanup($this->request->input('search_term'));
            return $this->builder->where('name', 'LIKE', "%{$search_term}%");
        }
    }

    protected function types()
    {
        if ($this->request->has('std_types')) {
            $types = array_values(explode(',', $this->request->input('std_types')));
            return $this->builder->whereIn('type', $types);
        }
    }

    protected function families()
    {
        if ($this->request->has('std_families')) {
            $families = $this->arrayCleanup(array_values(explode(',', $this->request->input('std_families'))));
            return $this->builder->join('stdn_families', 'standards.id', '=', 'stdn_families.standard_id')
            ->whereIn('stdn_families.family_id', $families);
        }
    }

    protected function versions()
    {
        if ($this->request->has('std_versions')) {
            $versions = $this->arrayCleanup(array_values(explode(',', $this->request->input('std_versions'))));

            return $this->builder->join('stdn_versions', 'standards.id', '=', 'stdn_versions.standard_id')
            ->whereIn('stdn_versions.version_id', $versions);
        }
    }

    protected function focuses()
    {
        if ($this->request->has('std_focuses')) {
            $focuses = $this->arrayCleanup(array_values(explode(',', $this->request->input('std_focuses'))));

            return $this->builder->join('std_n_focuses', 'standards.id', '=', 'std_n_focuses.standard_id')
            ->whereIn('std_n_focuses.focus_id', $focuses);
        }
    }

    protected function statutes()
    {
        if ($this->request->has('std_statutes')) {
            $statutes = $this->arrayCleanup(array_values(explode(',', $this->request->input('std_statutes'))));
            return $this->builder->join('std_n_satutes', 'standards.id', '=', 'std_n_satutes.standard_id')
            ->whereIn('std_n_satutes.satue_id', $statutes);
        }
    }

    private function arrayCleanup($array){
        $intArray = [];
        foreach ($array as $value) {
            $intArray[] = intval($value);
        }
        return $intArray;
    }

    private function searchTextCleanup($text)
    {
        if (strpos($text, '@')) {
            $text = str_replace(' ', '+', $text);
        }

        return strtolower(trim($text));
    }
}
