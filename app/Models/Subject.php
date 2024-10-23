<?php

namespace App\Models;

use App\Models\Subject\Column;
use App\Models\Subject\Row;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Subject extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];

    public function rows()
    {
        return $this->hasMany(Row::class, 'subject_id');
    }

    public function columns()
    {
        return $this->hasMany(Column::class, 'subject_id');
    }
}
