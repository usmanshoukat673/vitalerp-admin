<?php

namespace App\Traits;

use App\Models\Activity;

trait RecordActivity
{
    protected static function bootRecordActivity()
    {
        foreach (static::getActivitiesToRecord() as $event) {
            static::$event(function ($model) use ($event) {
                $model->recordActivity($event);
            });
        }

        static::deleting(function ($model) {
            $model->activity()->delete();
        });
    }

    public function activity()
    {
        return $this->morphMany(Activity::class, 'subject');
    }

    protected static function getActivitiesToRecord()
    {
        return ['created'];
    }

    public function recordActivity($event)
    {
        if (auth()->user()) {
            $this->activity()->create([
                'type' => $this->getActivityType($event),
                'user_id' => auth()->user()->id,
                'comp_id' => $this->getCompId()
            ]);
        } else {
            $this->activity()->create([
                'type' => $this->getActivityType($event),
                'user_id' =>  $this->getUserId(),
                'comp_id' => $this->getCompId()
            ]);
        }
    }

    // not in use just for ref
    public function getUserId()
    {
        if ((new \ReflectionClass($this))->getShortName() == 'UserCompanies') {
            return $this->getUserId();
        }
    }

    public function getActivityType($event)
    {
        $type = strtolower((new \ReflectionClass($this))->getShortName());

        return "{$event}_{$type}";
    }
}
