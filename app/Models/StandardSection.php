<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;

class StandardSection extends Model
{
    // use Searchable;

    protected $fillable = ['standard_id', 'parent', 'name', 'description', 'menu_name'];

    protected $appends = ['slug', 'selected'];


    public function getSlugAttribute()
    {
        return Str::slug($this->menu_name);
    }

    public function controls()
    {
        return $this->hasMany(SectionControl::class, 'standard_section_id');
    }

    public function sections()
    {
        return $this->hasMany(StandardSection::class, 'parent');
    }

    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    public function getSelectedAttribute()
    {
        return true;
    }

    public function users()
    {
        return $this->hasMany(UserSection::class, 'section_id', 'id');
    }

    // like information
    public function like()
    {
        return $this->hasOne(UserSectionLike::class, 'section_id', 'id');
    }
}
