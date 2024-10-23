<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $appends = ['total_comments', 'due_status', 'start', 'end', 'name'];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    public function modified()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }

    public function sub_tasks()
    {
        return $this->hasMany(Task::class, 'parent', 'id');
    }

    public function documents()
    {
        return $this->hasMany(TaskDocuments::class, 'task_id');
    }

    public function assign_to()
    {
        return $this->hasMany(TaskUser::class, 'task_id');
    }

    public function comments()
    {
        return $this->hasMany(TaskComment::class, 'task_id');
    }

    public function controls()
    {
        return $this->hasMany(TaskControls::class, 'task_id');
    }

    public function list_types()
    {
        return $this->hasMany(TaskListType::class, 'task_id');
    }

    public function getTotalCommentsAttribute()
    {
        return $this->comments()->get()->count();
    }

    /**
     * get the status of the due date
     * on_its_way
     * on_track
     * overdue
     * @return void
     */
    public function getDueStatusAttribute()
    {

        if($this->getDueDateTimestamp() >= strtotime(now()->addDays(4)->toTimeString()))
        {
            return 'on_its_way';
        }
        else if($this->getDueDateTimestamp() >= strtotime(now()->addDays(3)->toDateString())){
            return 'on_track';
        }
        else if($this->getDueDateTimestamp() < strtotime(now()->today()->toDateString())){
            return 'overdue';
        }
        else if($this->getDueDateTimestamp() == strtotime(now()->today()->toDateString())){
            return 'on_track';
        }

        return 'not_found';
    }

    public function getStartAttribute()
    {
        return (Carbon::parse($this->created_at))->toDateString();
    }

    public function getEndAttribute()
    {
        return (Carbon::parse($this->due_date))->toDateString();
    }

    public function getDueDateTimestamp()
    {
        return strtotime((Carbon::parse($this->due_date))->toDateString());
    }

    public function getNameAttribute()
    {
        return $this->title;
    }

}
