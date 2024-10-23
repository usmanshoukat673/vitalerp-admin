<?php
namespace App\Traits;

trait SubjectsHelper{
    protected function getFields($column_id, $field_model){
        return $field_model::where(['column_id' => $column_id])->get();
    }
}