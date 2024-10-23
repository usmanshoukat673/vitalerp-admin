<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SeedEthnicities extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $list = [
            ['name' => 'Black American'],
            ['name' => 'Hispanic American'],
            ['name' => 'Native American (American Indians, Eskimos, Aleuts, or Native Hawaiians)'],
            ['name' => 'Asian-Pacific American persons with origins from Burma, Thailand, Malaysia, Indonesia, Singapore, Brunei, Japan, China, Taiwan, Laos, Cambodia (Kampuchea), Vietnam, Korea, The Philippines, U.S. Trust Territory of the Pacific Islands (Republic of Palau), Republic of the Marshall Islands, Federated States of Micronesia, the Commonwealth of the Northern Mariana Islands, Guam, Samoa, Macao, Hong Kong, Fiji, Tonga, Kiribati, Tuvalu, or Nauru)'],
            ['name' => 'Subcontinent Asian (Asian-Indian) American (persons with origins from India, Pakistan, Bangladesh, Sri Lankda, Bhutan, the Maldives Islands,, or Nepal)'],
            ['name' => 'Individual/concern, other than one of the proceding'],
            ['name' => 'Decline to answer']
        ];

        foreach ($list as $item) {
            \App\Models\Ethnicity::firstOrCreate($item);
        }
    }
}
