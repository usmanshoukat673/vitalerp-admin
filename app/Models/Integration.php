<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Integration extends Model
{
    protected $fillable = ['name', 'description', 'service_phone', 'web_address', 'logo'];

    public function categories()
    {
        return $this->hasMany(InteCategory::class, 'int_id');
    }

    public function models()
    {
        return $this->hasMany(InteModels::class, 'int_id');
    }
}
