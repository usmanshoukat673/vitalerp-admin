<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskListItem extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function list_type()
    {
        return $this->belongsTo(TaskListType::class, 'list_type_id');
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'task_id');
    }
}
