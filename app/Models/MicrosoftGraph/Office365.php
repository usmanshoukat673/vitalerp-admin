<?php

namespace App\Models\MicrosoftGraph;

use App\Traits\EncryptableTrait;
use Illuminate\Database\Eloquent\Model;

class Office365 extends Model
{
    use EncryptableTrait;

    protected $guarded = [];

    protected $encryptable = [
        'access_token',
    ];

    protected $casts = [
        'connected' => 'boolean',
        'expired' => 'boolean',
    ];
}
