<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Category extends Model
{
    protected $fillable = ['parent', 'name', 'description'];

    protected $appends = ['childs', 'slug'];

    public function getChildsAttribute()
    {
        return $this->childs()->get();
    }

    public function childs()
    {
        return $this->hasMany(Category::class, 'parent')->where(['active' => 1])->orderBy('name', 'asc');
    }

    public function getSlugAttribute()
    {
        return Str::slug($this->name);
    }
}
