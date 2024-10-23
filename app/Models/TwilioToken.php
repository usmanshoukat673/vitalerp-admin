<?php

namespace App\Models;

use App\Traits\Verification;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class TwilioToken extends Model
{
    use Verification;
    
    const EXPIRATION_TIME = 2; // minutes

    protected $fillable = [
        'code',
        'user_id',
        'used'
    ];

    public function __construct(array $attributes = [])
    {
        if (!isset($attributes['code'])) {
            $attributes['code'] = $this->generateCode();
        }

        parent::__construct($attributes);
    }

    /**
     * User tokens relation
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * True if the token is not used nor expired
     *
     * @return bool
     */
    public function isValid()
    {
        return !$this->isUsed() && !$this->isExpired();
    }

    /**
     * Is the current token used
     *
     * @return bool
     */
    public function isUsed()
    {
        return $this->used;
    }

    /**
     * Is the current token expired
     *
     * @return bool
     */
    public function isExpired()
    {
        return $this->created_at->diffInMinutes(Carbon::now()) > static::EXPIRATION_TIME;
    }

    public function sendCode()
    {
        if (!$this->user) {
            throw new \Exception("No user attached to this token.");
        }

        if (!$this->code) {
            $this->code = $this->generateCode();
        }
        try {
            app('twilio')->messages->create(
                $this->user->getPhoneNumber(),
                ['from' => config('twilio.TWILIO_NUMBER'), 'body' => "Your ".config('app.name')." verification code is {$this->code}"]
            );
        } catch (\Exception $ex) {
            return false; //enable to send SMS
        }

        return true;
    }

    public function sendWatchOTP()
    {
        if (!$this->user) {
            throw new \Exception("No user attached to this token.");
        }

        if (!$this->code) {
            $this->code = $this->generateCode();
        }
        try {
            app('twilio')->messages->create(
                $this->user->getWatchNumber(),
                ['from' => config('twilio.TWILIO_NUMBER'), 'body' => "Your DeviceWatch Verification OTP is {$this->code}"]
            );
        } catch (\Exception $ex) {
            return false; //enable to send SMS
        }

        return true;
    }
}
