<?php

use App\Models\UserCompanies;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int) $user->id === (int) $id;
});

Broadcast::channel('orders-{comp_id}', function ($user, $comp_id) {
    $companies = UserCompanies::select('comp_id')->where(['user_id' => $user->id])->pluck('comp_id')->toArray();
    return in_array($comp_id, $companies);
});