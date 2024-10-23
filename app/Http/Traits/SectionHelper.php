<?php

namespace App\Http\Traits;

use App\Models\SectionControl;
use App\Models\StandardSection;
use Illuminate\Database\Eloquent\Collection;

trait SectionHelper
{

    /**
     * @param $standard_id, $section 
     * @return Collection of Sub Sections 
     */
    public function getSubSections($standard_id, $section_id)
    {
        return StandardSection::select('id')->where(['standard_id' => $standard_id, 'parent' => $section_id])->get();
    }

    /**
     * @param $standard_id, $section 
     * @return Collection of Controls 
     */
    public function getSectionControls($standard_id, $section_id)
    {
        return SectionControl::select('id')->where(['standard_id' => $standard_id, 'standard_section_id' => $section_id])->get();
    }
}
