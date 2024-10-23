<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecordLocation extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function record(){
        return $this->belongsTo(Records::class, 'record_id');
    }

    public function location(){
        return $this->belongsTo(CompanyLocation::class, 'location_id');
    }

    public function asset_question(){
        return $this->belongsTo(AssetQuestion::class, 'question_id');
    }

    public function asset(){
        return $this->belongsTo(Lanscape::class, 'asset_id');
    }

    public function module(){
        return $this->belongsTo(Module::class, 'module_id');
    }
}
