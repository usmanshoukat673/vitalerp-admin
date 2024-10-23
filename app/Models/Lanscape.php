<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lanscape extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['childs'];

    public function getChildsAttribute()
    {
        return $this->childs()->get();
    }

    public function childs()
    {
        return $this->hasMany(Lanscape::class, 'parent')
        ->where(function ($q) {
            $q->where(['comp_id' => null])
                ->orWhere(['comp_id' => request()->comp_id]);
        })
        ->orderBy('name', 'asc');
    }

    public function records()
    {
        return $this->hasMany(Records::class, 'asset_id');
    }
}
