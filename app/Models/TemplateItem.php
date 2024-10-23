<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TemplateItem extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected function template()
    {
        return $this->belongsTo(Template::class, 'template_id');
    }

    public function item_type()
    {
        return $this->belongsTo(TemplateItemType::class, 'item_type_id');
    }

    public function related()
    {
        return $this->belongsTo(TemplateItemType::class, 'item_id');
    }
}
