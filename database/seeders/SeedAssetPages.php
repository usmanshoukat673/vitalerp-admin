<?php

namespace Database\Seeders;

use App\Models\AssetPage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedAssetPages extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $ap = new AssetPage();

        $ap->create([
            'title' => 'Software',
            'key' => 'software'
        ]);

        $ap->create([
            'title' => 'Hardware',
            'key' => 'hardware'
        ]);
    }
}
