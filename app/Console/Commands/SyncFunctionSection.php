<?php

namespace App\Console\Commands;

use App\Models\FunctionSections;
use App\Models\ParentSections;
use App\Models\SectionControl;
use App\Models\StandardSection;
use Illuminate\Console\Command;

class SyncFunctionSection extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sync:function-section';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Featch All new assigned control functions';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sections = SectionControl::select('standard_section_id', 'function_id')->whereIn('function_id', [1, 2, 3, 4, 5])
            ->distinct('standard_section_id')
            ->get();

        if (count($sections) > 0) {
            foreach ($sections as $sec) {
                $section = StandardSection::find($sec->standard_section_id);
                if (!FunctionSections::where(['function_id' => $sec->function_id, 'section_id' => $section->id])->first()) {
                    $new_section = FunctionSections::create([
                        'function_id' => $sec->function_id,
                        'section_id' => $section->id,
                        'standard_id' => $section->standard_id,
                        'menu_name' => $section->menu_name,
                        'abbreviation' => $section->abbreviation,
                        'psection_id' => $section->parent,
                    ]);
                    $this->handlePSection($section->parent, $sec->function_id);
                } else {
                    FunctionSections::where(['function_id' => $sec->function_id, 'section_id' => $section->id])
                        ->update([
                            'menu_name' => $section->menu_name,
                            'abbreviation' => $section->abbreviation,
                            'psection_id' => $section->parent
                        ]);
                    $this->handlePSection($section->parent, $sec->function_id);
                }
            }
        }
    }

    public function handlePSection($parent_section_id, $function_id)
    {
        if ($parent_section_id) {
            $psection = ParentSections::where(['psection_id' => $parent_section_id, 'function_id' => $function_id])->first();
            $parent_section = StandardSection::find($parent_section_id);
            if ($psection) {
                ParentSections::where(['psection_id' => $parent_section_id, 'function_id' => $function_id])
                    ->update([
                        'menu_name' => $parent_section->menu_name,
                        'abbreviation' => $parent_section->abbreviation,
                    ]);
            } else {
                ParentSections::create([
                    'function_id' => $function_id,
                    'psection_id' => $parent_section_id,
                    'standard_id' => $parent_section->standard_id,
                    'menu_name' => $parent_section->menu_name,
                    'abbreviation' => $parent_section->abbreviation
                ]);
            }
        }
    }
}
