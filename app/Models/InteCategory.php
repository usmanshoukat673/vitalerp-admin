<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InteCategory extends Model
{
    protected $fillable = ['int_id', 'cat_id'];

    public function category()
    {
        return $this->belongsTo(Category::class, 'cat_id');
    }

    public function integration()
    {
        return $this->belongsTo(Integration::class, 'int_id');
    }
}
