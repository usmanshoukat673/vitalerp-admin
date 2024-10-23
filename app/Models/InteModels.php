<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InteModels extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function model()
    {
        return $this->belongsTo(ControlModel::class, 'model_id');
    }
}
