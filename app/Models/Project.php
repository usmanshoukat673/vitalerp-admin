<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    use HasFactory, SoftDeletes;

    protected $guarded = [];
    protected $appends = ['total_comments'];

    protected static function boot()
    {
        parent::boot();
        static::created(function ($model) {
            $model->kanban_columns()->create([
                'strict_name' => 'todoTasks',
                'default_name' => 'TODO',
                'project_id' => $model->id,
                'comp_id' => $model->comp_id
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'inprogressTasks',
                'default_name' => 'In Progress',
                'project_id' => $model->id,
                'comp_id' => $model->comp_id
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'waitingTasks',
                'default_name' => 'Waiting',
                'project_id' => $model->id,
                'comp_id' => $model->comp_id
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'reviewTasks',
                'default_name' => 'Review',
                'project_id' => $model->id,
                'comp_id' => $model->comp_id
            ]);
            $model->kanban_columns()->create([
                'strict_name' => 'doneTasks',
                'default_name' => 'Done',
                'project_id' => $model->id,
                'comp_id' => $model->comp_id
            ]);
        });
    }

    public function subjects(){
        return $this->hasMany(Subject::class, 'project_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'project_id');
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function modified()
    {
        return $this->belongsTo(User::class, 'modified_by');
    }

    public function documents()
    {
        return $this->hasMany(ProjectDocuments::class, 'project_id');
    }

    public function assign_to()
    {
        return $this->hasMany(ProjectUsers::class, 'project_id');
    }

    public function comments()
    {
        return $this->hasMany(ProjectComments::class, 'project_id');
    }

    public function getTotalCommentsAttribute()
    {
        return $this->comments()->get()->count();
    }

    public function kanban_columns()
    {
        return $this->hasMany(KanbanColumn::class, 'project_id');
    }
}
