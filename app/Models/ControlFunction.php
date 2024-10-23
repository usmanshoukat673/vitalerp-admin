<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ControlFunction extends Model
{
    use HasFactory;

    protected $appends = ['slug'];

    public function getSlugAttribute()
    {
        return Str::slug($this->name);
    }

    public function sections()
    {
        // needs to filter based on the current active company & its permissions rights
        return $this->hasMany(FunctionSections::class, 'function_id')->where(['standard_id' => 5])->orderBy('menu_name', 'asc');
    }

    public function psections()
    {
        // needs to filter based on the current active company & its permissions rights
        return $this->hasMany(ParentSections::class, 'function_id')->where(['standard_id' => 5])->orderBy('menu_name', 'asc');
    }
}
