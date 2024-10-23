<?php

namespace Database\Seeders;

use App\Models\Subject\FieldType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FieldTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $field_type = new FieldType();

        $field_type->create([
            'name' => 'Text',
            'model' => 'App\Models\Subject\TextField',
            'field_model' => 'App\Models\Subject\TextFieldRows',
            'component' => 'TextColumn',
            'sort_order' => 0,
        ]);

        $field_type->create([
            'name' => 'Multiline Text',
            'model' => 'App\Models\Subject\TextArea',
            'field_model' => 'App\Models\Subject\TextAreaRows',
            'component' => 'LongTextColumn',
            'sort_order' => 1,
        ]);
    }
}
