<?php

namespace App\Http\Traits;

trait TaskHelper
{
    public function _priorityText($priority)
    {
        if($priority == 1)
        {
            return 'Low';
        }
        else if($priority == 2)
        {
            return 'Medium';
        }
        else{
            return 'High';
        }
    }
}
