<?php

namespace App\Console\Commands;

use App\Jobs\MFARemindProcessor;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Console\Command;

class MFARemindPreProcessor extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'mfa:send-reminder';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remind user about enabling Two-Factor Authentication';

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
     * @return mixed
     */
    public function handle()
    {
        $users = User::where(['mfa_enabled' => 0])
            ->where(function ($query) {
                $query->whereDate('mfa_reminder', Carbon::now()->subDays(15))
                    ->orWhere(['mfa_reminder' => null]);
            })
            ->whereDate('created_at', '<=', Carbon::now()->subDays(15))
            ->get();

        if (count($users) > 0) {
            foreach ($users as $user) {
                MFARemindProcessor::dispatch($user);
            }
        }
    }
}
