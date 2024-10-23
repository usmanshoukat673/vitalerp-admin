<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RiskRegisterCst extends Model
{
    use HasFactory;

    protected $guarded = [];


    protected function serializeDate($date)
    {
        if (!$date) {
            return null;
        }
        return (Carbon::parse($date))->toISOString();
    }

    public function getStartDateAttribute($date)
    {
        return $this->serializeDate($date);
    }

    public function getActualComplDateAttribute($date)
    {
        return $this->serializeDate($date);
    }

    public function getCompletionDateAttribute($date)
    {
        return $this->serializeDate($date);
    }
}
