<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Domain extends Model
{
    use HasFactory;

    protected $table = 'standard_sections';

    /**
     * Get the slug attribute.
     *
     * @return string The slug.
     */
    public function getSlugAttribute()
    {
        return Str::slug($this->menu_name);
    }

    /**
     * Get the controls for the domain.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function controls()
    {
        return $this->hasMany(SectionControl::class, 'standard_section_id');
    }

    /**
     * Retrieve the sections associated with the domain.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sections()
    {
        return $this->hasMany(StandardSection::class, 'parent');
    }

    /**
     * Retrieve the associated Standard model.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function standard()
    {
        return $this->belongsTo(Standard::class, 'standard_id');
    }

    /**
     * Get the selected attribute.
     *
     * @return bool Returns true.
     */
    public function getSelectedAttribute()
    {
        return true;
    }

    /**
     * Retrieve the users associated with this domain.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function users()
    {
        return $this->hasMany(UserSection::class, 'section_id', 'id');
    }

    /**
     * A function to retrieve like information for the current domain.
     *
     * @throws Some_Exception_Class description of exception
     * @return Some_Return_Value
     */
    public function like()
    {
        return $this->hasOne(UserSectionLike::class, 'section_id', 'id');
    }

    
}
