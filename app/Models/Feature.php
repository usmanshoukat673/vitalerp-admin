<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    protected $fillable = [
        'plan_id',
        'feature_id',
        'feature_type',
        'type',
    ];
    
     /**
     * fetch the associated model subject for the recorded activity
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function feature()
    {
        return $this->morphTo();
    }
}
