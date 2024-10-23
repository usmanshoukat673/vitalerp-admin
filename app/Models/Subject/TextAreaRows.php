<?php

namespace App\Models\Subject;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TextAreaRows extends Model
{
    use HasFactory;

    protected $guarded = [];

    public static function addField($subject_id, $column_id, $row_id)
    {
        self::create([
            'subject_id' => $subject_id,
            'column_id' => $column_id,
            'row_id' => $row_id,
            'created_by' => request()->user()->id
        ]);
    }

    public static function deleteField($subject_id, $column_id)
    {
        self::where([
            'subject_id' => $subject_id,
            'column_id' => $column_id,
        ])->delete();
    }


    public static function deleteRow($subject_id, $row_id)
    {
        self::where([
            'subject_id' => $subject_id,
            'row_id' => $row_id,
        ])->delete();
    }
}
