<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function categories()
    {
        return $this->hasMany(TemplateLans::class, 'template_id')->where(['parent' => true]);
    }

    public function sub_categories()
    {
        return $this->hasMany(TemplateLans::class, 'template_id')->where(['parent' => false]);
    }

    protected function items()
    {
        return $this->hasMany(TemplateItem::class, 'template_id');
    }
}
