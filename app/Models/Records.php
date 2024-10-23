<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Records extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function parent(){
        return $this->belongsTo(Records::class, 'parent');
    }

    public function asset(){
        return $this->belongsTo(Lanscape::class, 'asset_id');
    }

    public function module(){
        return $this->belongsTo(Module::class, 'module_id');
    }

    public function company(){
        return $this->belongsTo(Company::class, 'comp_id');
    }

    public function createdby(){
        return $this->belongsTo(User::class, 'created_by')->select('id', 'first_name', 'last_name', 'email');;
    }

    public function related_records()
    {
        return $this->hasMany(RelatedRecords::class, 'record_id');
    }

    public function teams()
    {
        return $this->hasMany(RecordTeam::class, 'record_id');
    }

    public function users()
    {
        return $this->hasMany(RecordUser::class, 'record_id');
    }

    public function locations()
    {
        return $this->hasMany(RecordLocation::class, 'record_id');
    }
}
