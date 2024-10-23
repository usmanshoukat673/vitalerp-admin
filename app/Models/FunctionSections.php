<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class FunctionSections extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['slug'];

    public function getSlugAttribute()
    {
        return Str::slug($this->menu_name);
    }
}
