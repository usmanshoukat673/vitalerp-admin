<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('freshdesk:refresh')->everyThirtyMinutes();

Schedule::command('freshservice:refresh')->everyThirtyMinutes();

Schedule::command('mfa:send-reminder')->dailyAt('15:00'); // 10 AM EST

Schedule::command('sync:function-section')->everyFifteenMinutes();

// Schedule::command('rete:sync-categories')->everyFifteenMinutes();