<?php

namespace Database\Seeders;

use App\Models\Subject\Column;
use App\Models\Subject\Row;
use App\Models\Subject\TextAreaRows;
use App\Models\Subject\TextField;
use App\Models\Subject\TextFieldRows;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ColumnSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $row = new Row();

        $row = $row->create([
            'subject_id' => 1
        ]);

        $column = new Column();

        $column = $column->create([
            'subject_id' => 1,
            'field_type_id' => 1,
            'field_model' => 'App\Models\Subject\TextFieldRows',
            'component' => 'TextColumn',
            'name' => 'Name',
            'comp_id' => 1,
            'project_id' => 6,
            'created_by' => 1
        ]);

        // create rows
        $text_field_rows = new TextFieldRows();
        $text_field_rows->create([
            'row_id' => $row->id,
            'subject_id' => 1,
            'column_id' => $column->id,
            'created_by' => 1
        ]);

        $column = $column->create([
            'subject_id' => 1,
            'field_type_id' => 2,
            'field_model' => 'App\Models\Subject\TextAreaRows',
            'component' => 'LongTextColumn',
            'name' => 'Description',
            'comp_id' => 1,
            'project_id' => 6,
            'created_by' => 1
        ]);

    
        // create row
        $text_area_row = new TextAreaRows();
        $text_area_row->create([
            'row_id' => $row->id,
            'subject_id' => 1,
            'column_id' => $column->id,
            'created_by' => 1
        ]);
    }
}
