<?php

namespace Database\Seeders;

use App\Models\MotionPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MotionsPlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        MotionPlan::create([
            'name' => 'Business Pack',
            'price' => 19.00,
            'stripe_price' => 'price_1NTNSDB98JHyq5WrPGxOUWx1'
        ]);
    }
}
