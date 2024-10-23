<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordActivity extends Model
{
    protected $fillable = [
        'user_id', 'ip', 'system'
    ];
}
