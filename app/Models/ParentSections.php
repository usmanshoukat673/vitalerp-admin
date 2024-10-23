<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParentSections extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['selected'];

    public function getSelectedAttribute()
    {
        return false;
    }

    public function sections()
    {
        // needs to filter based on the current active company & its permissions rights
        return $this->hasMany(FunctionSections::class, 'psection_id', 'psection_id')
            // ->where([
            //     'function_id' => $this->function_id
            // ])
            ->orderBy('menu_name', 'asc');
    }
}
