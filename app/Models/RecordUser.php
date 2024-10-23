<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecordUser extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function record(){
        return $this->belongsTo(Records::class, 'record_id');
    }

    public function user(){
        return $this->belongsTo(User::class, 'user_id');
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
